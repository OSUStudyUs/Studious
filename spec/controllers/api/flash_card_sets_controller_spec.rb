require 'rails_helper'

RSpec.describe Api::FlashCardSetsController, type: :controller do
  # Author: Mary Zhou
  # Revisions:
  #   1: 11/23/16 - Mary Zhou - initial implementation
  describe "GET #index" do
    let!(:flash_card_set) { FactoryGirl.create(:flash_card_set, :for_a_user) }
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
        expect(assigns(:flash_card_sets)).to eq [flash_card_set]
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

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/23/16 - Mary Zhou - initial implementation
  #   1: 12/01/16 - Kyle Thompson - add tests for 404 paths
  describe "GET #show" do
    let!(:flash_card_set) { FactoryGirl.create(:flash_card_set, :for_a_user) }
    let!(:public_flash_card_set) { FactoryGirl.create(:flash_card_set, :for_a_user, public: true) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(flash_card_set.user) }
    let(:bad_headers) { auth_header(user) }

    context "when passed the correct user's token" do
      it "has status 200" do
        request.headers.merge! headers
        get :show, params: { id: flash_card_set }, format: :json
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

    context "when passed a token for a different set" do
      it "has status 404" do
        request.headers.merge! bad_headers
        get :show, params: { id: flash_card_set }, format: :json
        expect(response).to have_http_status(404)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        get :show, params: { id: flash_card_set }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/23/16 - Mary Zhou - initial implementation
  describe "POST #create" do
    let!(:flash_card_set) { FactoryGirl.attributes_for(:flash_card_set) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "with correct attributes" do
      it "has status 201" do
        request.headers.merge! headers
        post :create, params: { user_id: user, flash_card_set: flash_card_set }, format: :json
        expect(response).to have_http_status(201)
        expect(response.content_type).to eq("application/json")
      end

      it "saves the new flash card set" do
        request.headers.merge! headers
        expect {
          post :create, params: { user_id: user, flash_card_set: flash_card_set }, format: :json
        }.to change(FlashCardSet, :count).by 1
      end

      it "renders the show template" do
        request.headers.merge! headers
        post :create, params: { user_id: user, flash_card_set: flash_card_set }, format: :json
        expect(response).to render_template(:show)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        post :create, params: { user_id: user, flash_card_set: flash_card_set }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/23/16 - Mary Zhou - initial implementation
  describe "PATCH #update" do
    let!(:flash_card_set) { FactoryGirl.create(:flash_card_set, :for_a_user) }
    let(:different_flash_card_set) { FactoryGirl.attributes_for(:flash_card_set, public: true) }
    let(:headers) { auth_header(flash_card_set.user) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:bad_headers) { auth_header(user) }

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
          flash_card_set.reload
          expect(flash_card_set.public).to eq true
        end

        it "renders the show template" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
          expect(response).to render_template(:show)
        end
      end
    end

    context "when passed the wrong user's token" do
      it "has status 401" do
        request.headers.merge! bad_headers
        patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
        expect(response).to have_http_status(404)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        patch :update, params: { id: flash_card_set, flash_card_set: different_flash_card_set }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/23/16 - Mary Zhou - initial implementation
  describe "DELETE #destroy" do
    let!(:flash_card_set) { FactoryGirl.create(:flash_card_set, :for_a_user) }
    let(:headers) { auth_header(flash_card_set.user) }

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
        }.to change(FlashCardSet, :count).by -1
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
