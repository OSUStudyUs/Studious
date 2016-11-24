require 'rails_helper'

RSpec.describe Api::FlashCardSetsController, type: :controller do
  describe "GET #index" do
    let!(:flash_card_set) { FactoryGirl.create(:flash_card_set) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed a valid token" do
      it "has status 200" do
        request.headers.merge! headers
        get :index, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @flash_card_set" do
        request.headers.merge! headers
        get :index, format: :json
        expect(assigns(:flash_card_set)).to eq [flash_card_set]
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

  describe "GET #show" do
    let!(:flash_card_set) { FactoryGirl.create(:flash_card_set) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed the correct user's token" do
      it "has status 200" do
        request.headers.merge! headers
        get :show, params: { id: user }, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @flash_card_set" do
        request.headers.merge! headers
        get :show, params: { id: flash_card_set }, format: :json
        expect(assigns(:flash_card_set)).to eq flash_card_set
      end

      it "renders the show template" do
        request.headers.merge! headers
        get :show, params: { id: flash_card_set }, format: :json
        expect(response).to render_template(:show)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        get :show, params: { id: flash_card_set }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "POST #create" do
    let(:flash_card_set) { FactoryGirl.attributes_for(:flash_card_set) }
    let(:incorrect_flash_card_set) { FactoryGirl.attributes_for(:flash_card_set, :invalid) }

    context "with correct attributes" do
      it "has status 201" do
        post :create, params: { flash_card_set: flash_card_set }, format: :json
        expect(response).to have_http_status(201)
        expect(response.content_type).to eq("application/json")
      end

      it "saves the new flash card set" do
        expect {
          post :create, params: { flash_card_set: flash_card_set }, format: :json
        }.to change(FlashCardSets, :count).by 1
      end

      it "renders the show template" do
        post :create, params: { flash_card_set: flash_card_set }, format: :json
        expect(response).to render_template(:show)
      end
    end

    context "with incorrect attributes" do
      it "has status 409" do
        post :create, params: { flash_card_set: incorrect_flash_card_set }, format: :json
        expect(response).to have_http_status(409)
        expect(response.content_type).to eq("application/json")
      end

      it "doesn't save the new flash card set" do
        expect {
          post :create, params: { flash_card_set: incorrect_flash_card_set }, format: :json
        }.not_to change(FlashCardSets, :count)
      end
    end
  end

  describe "PATCH #update" do
    let!(:user) { FactoryGirl.create(:user) }
    let(:flash_card_set) { FactoryGirl.attributes_for(:flash_card_set) }
    let!(:other_flash_card_set) { FactoryGirl.create(:flash_card_set) }
    let(:different_flash_card_set) { FactoryGirl.attributes_for(:flash_card_set, study_group_id: 2) }
    let(:invalid_flash_card_set) { FactoryGirl.attributes_for(:flash_card_set, study_group_id: nil) }
    let(:headers) { auth_header(user) }

    context "when passed the correct user's token" do
      context "with valid attributes" do
        it "has status 200" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
          expect(response).to have_http_status(200)
          expect(response.content_type).to eq("application/json")
        end

        it "assigns @flash_card_set" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
          expect(assigns(:flash_card_set)).to eq flash_card_set
        end

        it "updates the flash card set" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
          user.reload
          expect(user.study_group_id).to eq 2
        end

        it "renders the show template" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
          expect(response).to render_template(:show)
        end
      end

      context "with invalid attributes" do
        it "has status 409" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card_set, flash_card_set: invalid_flash_card_set }, format: :json
          expect(response).to have_http_status(409)
          expect(response.content_type).to eq("application/json")
        end

        it "doesn't update the flash card set" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
          expect(assigns(:flash_card_set).reload.attributes).to eq flash_card_set.reload.attributes
        end
      end
    end

    context "when passed the wrong user's token" do
      it "has status 401" do
        request.headers.merge! headers
        patch :update, params: { id: other_flash_card_set, user: different_flash_card_set }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "DELETE #destroy" do
	let(:flash_card_set) { FactoryGirl.attributes_for(:flash_card_set) }
    let!(:user) { FactoryGirl.create(:user) }
    let!(:other_user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed the correct user's token" do
      it "has status 204" do
        request.headers.merge! headers
        delete :destroy, params: { id: flash_card_set }, format: :json
        expect(response).to have_http_status(204)
      end

      it "destroys the flash card set" do
        request.headers.merge! headers

        expect {
          delete :destroy, params: { id: flash_card_set }, format: :json
        }.to change(FlashCardSets, :count).by -1
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        delete :destroy, params: { id: flash_card_set }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end
end
