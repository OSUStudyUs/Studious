require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  describe "GET #index" do
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed a valid token" do
      it "has status 200" do
        request.headers.merge! headers
        get :index, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @users" do
        request.headers.merge! headers
        get :index, format: :json
        expect(assigns(:users)).to eq [user]
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

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  describe "GET #show" do
    let!(:user) { FactoryGirl.create(:user) }
    let(:other_user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed the correct user's token" do
      it "has status 200" do
        request.headers.merge! headers
        get :show, params: { id: user }, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @user" do
        request.headers.merge! headers
        get :show, params: { id: user }, format: :json
        expect(assigns(:user)).to eq user
      end

      it "renders the show template" do
        request.headers.merge! headers
        get :show, params: { id: user }, format: :json
        expect(response).to render_template(:show)
      end
    end

    context "when passed the wrong user's token" do
      it "has status 401" do
        request.headers.merge! headers
        get :show, params: { id: other_user }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        get :show, params: { id: user }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  describe "POST #create" do
    let(:user) { FactoryGirl.attributes_for(:user) }
    let(:incorrect_user) { FactoryGirl.attributes_for(:user, :invalid) }

    context "with correct attributes" do
      it "has status 201" do
        post :create, params: { user: user }, format: :json
        expect(response).to have_http_status(201)
        expect(response.content_type).to eq("application/json")
      end

      it "saves the new user" do
        expect {
          post :create, params: { user: user }, format: :json
        }.to change(User, :count).by 1
      end
    end

    context "with incorrect attributes" do
      it "has status 409" do
        post :create, params: { user: incorrect_user }, format: :json
        expect(response).to have_http_status(409)
        expect(response.content_type).to eq("application/json")
      end

      it "doesn't save the new user" do
        expect {
          post :create, params: { user: incorrect_user }, format: :json
        }.not_to change(User, :count)
      end
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  describe "PATCH #update" do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:other_user) { FactoryGirl.create(:user) }
    let(:different_user) { FactoryGirl.attributes_for(:user, first_name: "Kyle") }
    let(:invalid_user) { FactoryGirl.attributes_for(:user, first_name: nil) }
    let(:headers) { auth_header(user) }

    context "when passed the correct user's token" do
      context "with valid attributes" do
        it "has status 200" do
          request.headers.merge! headers
          patch :update, params: { id: user, user: different_user }, format: :json
          expect(response).to have_http_status(200)
          expect(response.content_type).to eq("application/json")
        end

        it "assigns @user" do
          request.headers.merge! headers
          patch :update, params: { id: user, user: different_user }, format: :json
          expect(assigns(:user)).to eq user
        end

        it "updates the user" do
          request.headers.merge! headers
          patch :update, params: { id: user, user: different_user }, format: :json
          user.reload
          expect(user.first_name).to eq "Kyle"
        end

        it "renders the show template" do
          request.headers.merge! headers
          patch :update, params: { id: user, user: different_user }, format: :json
          expect(response).to render_template(:show)
        end
      end

      context "with invalid attributes" do
        it "has status 409" do
          request.headers.merge! headers
          patch :update, params: { id: user, user: invalid_user }, format: :json
          expect(response).to have_http_status(409)
          expect(response.content_type).to eq("application/json")
        end

        it "doesn't update the user" do
          request.headers.merge! headers
          patch :update, params: { id: user, user: different_user }, format: :json
          expect(assigns(:user).reload.attributes).to eq user.reload.attributes
        end
      end
    end

    context "when passed the wrong user's token" do
      it "has status 401" do
        request.headers.merge! headers
        patch :update, params: { id: other_user, user: different_user }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        patch :update, params: { id: user, user: different_user }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  describe "DELETE #destroy" do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:other_user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed the correct user's token" do
      it "has status 204" do
        request.headers.merge! headers
        delete :destroy, params: { id: user }, format: :json
        expect(response).to have_http_status(204)
      end

      it "destroys the user" do
        request.headers.merge! headers

        expect {
          delete :destroy, params: { id: user }, format: :json
        }.to change(User, :count).by -1
      end
    end

    context "when passed the wrong user's token" do
      it "has status 401" do
        request.headers.merge! headers
        delete :destroy, params: { id: other_user }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        delete :destroy, params: { id: user }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end
end
