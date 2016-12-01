require 'rails_helper'

RSpec.describe Api::StudyGroupsController, type: :controller do
  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/27/16 - Sean Whitehurst - initial implementation
  describe "GET #index" do
    let(:study_group) { FactoryGirl.create(:study_group) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed a valid token" do
      it "has status 200" do
        request.headers.merge! headers
        get :index, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @study_groups" do
        request.headers.merge! headers
        get :index, format: :json
        expect(assigns(:study_groups)).to eq [study_group]
      end

      it "renders the index template" do
        request.headers.merge! headers
        get :index, format: :json
        expect(response).to render_template(:index)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        get :index, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/27/16 - Sean Whitehurst - initial implementation
  #   1: 12/01/16 - Kyle Thompson - add tests for 404 paths
  describe "GET #show" do
    let!(:study_group_with_user) { FactoryGirl.create(:study_group, :with_a_user) }
    let!(:open_study_group) { FactoryGirl.create(:study_group, accepting_new_members: true) }
    let!(:other_user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(study_group_with_user.users.first) }
    let(:headers_other) { auth_header(other_user) }

    context "when passed the correct user's token" do
      it "has status 200" do
        request.headers.merge! headers
        get :show, params: { id: study_group_with_user }, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @study_group" do
        request.headers.merge! headers
        get :show, params: { id: study_group_with_user }, format: :json
        expect(assigns(:study_group)).to eq study_group_with_user
      end

      it "renders the show template" do
        request.headers.merge! headers
        get :show, params: { id: study_group_with_user }, format: :json
        expect(response).to render_template(:show)
      end
    end

    context "when passed the wrong user's token" do
      context "and the study group is accepting new members" do
        it "has status 401" do
          request.headers.merge! headers_other
          get :show, params: { id: open_study_group }, format: :json
          expect(response).to have_http_status(401)
        end
      end

      context "and the study group is not accepting new members" do
        it "has status 404" do
          request.headers.merge! headers_other
          get :show, params: { id: study_group_with_user }, format: :json
          expect(response).to have_http_status(404)
        end
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        get :show, params: { id: study_group_with_user }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/27/16 - Sean Whitehurst - initial implementation
  describe "POST #create" do
    let!(:study_group_with_user) { FactoryGirl.attributes_for(:study_group) }
    let!(:incorrect_study_group) { FactoryGirl.attributes_for(:study_group, name: nil) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "with correct attributes" do
      it "has status 201" do
        request.headers.merge! headers
        post :create, params: { study_group: study_group_with_user }, format: :json
        expect(response).to have_http_status(201)
        expect(response.content_type).to eq("application/json")
      end

      it "saves the new group" do
        request.headers.merge! headers
        expect {
          post :create, params: { study_group: study_group_with_user }, format: :json
        }.to change(StudyGroup, :count).by 1
      end
    end

    context "with incorrect attributes" do
      it "has status 409" do
        request.headers.merge! headers
        post :create, params: { study_group: incorrect_study_group }, format: :json
        expect(response).to have_http_status(409)
        expect(response.content_type).to eq("application/json")
      end

      it "doesn't save the new group" do
        request.headers.merge! headers
        expect {
          post :create, params: { study_group: incorrect_study_group }, format: :json
        }.not_to change(StudyGroup, :count)
      end
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/27/16 - Sean Whitehurst - initial implementation
  describe "PATCH #update" do
    let!(:study_group_with_admin) { FactoryGirl.create(:study_group, :with_an_admin) }
    let!(:other_study_group) { FactoryGirl.create(:study_group) }
    let(:invalid_study_group) { FactoryGirl.attributes_for(:study_group, name: nil) }
    let(:different_study_group) { FactoryGirl.attributes_for(:study_group, accepting_new_members: true) }
    let(:headers) { auth_header(study_group_with_admin.users.first) }

    context "when passed the correct user's token" do
      context "with valid attributes" do
        it "has status 200" do
          request.headers.merge! headers
          patch :update, params: { id: study_group_with_admin, study_group: different_study_group }, format: :json
          expect(response).to have_http_status(200)
          expect(response.content_type).to eq("application/json")
        end

        it "assigns @study_group" do
          request.headers.merge! headers
          patch :update, params: { id: study_group_with_admin, study_group: different_study_group }, format: :json
          expect(assigns(:study_group)).to eq study_group_with_admin
        end

        it "updates the study group" do
          request.headers.merge! headers
          patch :update, params: { id: study_group_with_admin, study_group: different_study_group }, format: :json
          study_group_with_admin.reload
          expect(study_group_with_admin.accepting_new_members).to eq true
        end

        it "renders the show template" do
          request.headers.merge! headers
          patch :update, params: { id: study_group_with_admin, study_group: different_study_group }, format: :json
          expect(response).to render_template(:show)
        end
      end

      context "with invalid attributes" do
        it "has status 409" do
          request.headers.merge! headers
          patch :update, params: { id: study_group_with_admin, study_group: invalid_study_group }, format: :json
          expect(response).to have_http_status(409)
          expect(response.content_type).to eq("application/json")
        end

        it "doesn't update the study group" do
          request.headers.merge! headers
          patch :update, params: { id: study_group_with_admin, study_group: invalid_study_group }, format: :json
          expect(assigns(:study_group).reload.attributes).to eq study_group_with_admin.reload.attributes
        end
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        patch :update, params: { id: study_group_with_admin, study_group: different_study_group }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/27/16 - Sean Whitehurst - initial implementation
  describe "DELETE #destroy" do
    let!(:study_group_with_admin) { FactoryGirl.create(:study_group, :with_an_admin) }
    let!(:other_user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(study_group_with_admin.users.first) }
    let(:headers_other) { auth_header(other_user) }

    context "when passed the correct user's token" do
      it "has status 204" do
        request.headers.merge! headers
        delete :destroy, params: { id: study_group_with_admin }, format: :json
        expect(response).to have_http_status(204)
      end

      it "destroys the study group" do
        request.headers.merge! headers

        expect {
          delete :destroy, params: { id: study_group_with_admin }, format: :json
        }.to change(StudyGroup, :count).by -1
      end
    end

    context "when passed the wrong user's token" do
      it "has status 401" do
        request.headers.merge! headers_other
        delete :destroy, params: { id: study_group_with_admin }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        delete :destroy, params: { id: study_group_with_admin }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end
end
