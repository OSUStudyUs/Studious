require 'rails_helper'

RSpec.describe Api::FlashCardsController, type: :controller do
  describe "POST #create" do
    let(:flash_card) { FactoryGirl.attributes_for(:flash_card) }
    let(:incorrect_flash_card) { FactoryGirl.attributes_for(:flash_card, question: nil) }
    let(:flash_card_set) { FactoryGirl.create(:flash_card_set, :for_a_user) }
    let(:headers) { auth_header(flash_card_set.user) }

    context "with correct attributes" do
      it "has status 201" do
        request.headers.merge! headers
        post :create, params: { flash_card_set_id: flash_card_set.id, flash_card: flash_card }, format: :json
        expect(response).to have_http_status(201)
        expect(response.content_type).to eq("application/json")
      end

      it "saves the new flash card" do
        request.headers.merge! headers
        expect {
          post :create, params: { flash_card_set_id: flash_card_set.id, flash_card: flash_card }, format: :json
        }.to change(FlashCard, :count).by 1
      end

      it "renders the show template" do
        request.headers.merge! headers
        post :create, params: { flash_card_set_id: flash_card_set.id, flash_card: flash_card }, format: :json
        expect(response).to render_template(:show)
      end
    end

    context "with incorrect attributes" do
      it "has status 409" do
        request.headers.merge! headers
        post :create, params: { flash_card_set_id: flash_card_set.id, flash_card: incorrect_flash_card }, format: :json
        expect(response).to have_http_status(409)
        expect(response.content_type).to eq("application/json")
      end

      it "doesn't save the new flash card" do
        request.headers.merge! headers
        expect {
          post :create, params: { flash_card_set_id: flash_card_set.id, flash_card: incorrect_flash_card }, format: :json
        }.not_to change(FlashCard, :count)
      end
    end
  end

  describe "PATCH #update" do
    let!(:flash_card) { FactoryGirl.create(:flash_card, :for_a_user) }
    let!(:other_flash_card) { FactoryGirl.create(:flash_card, :for_a_user) }
    let(:different_flash_card) { FactoryGirl.attributes_for(:flash_card, question: "Test question") }
    let(:invalid_flash_card) { FactoryGirl.attributes_for(:flash_card, question: nil) }
    let(:headers) { auth_header(flash_card.flash_card_set.user) }

    context "when passed the correct user's token" do
      context "with valid attributes" do
        it "has status 200" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card, flash_card: different_flash_card }, format: :json
          expect(response).to have_http_status(200)
          expect(response.content_type).to eq("application/json")
        end

        it "assigns @flash_card" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card, flash_card: different_flash_card }, format: :json
          expect(assigns(:flash_card)).to eq flash_card
        end

        it "updates the flash card" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card, flash_card: different_flash_card }, format: :json
          flash_card.reload
          expect(flash_card.question).to eq "Test question"
        end

        it "renders the show template" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card, flash_card: different_flash_card }, format: :json
          expect(response).to render_template(:show)
        end
      end

      context "with invalid attributes" do
        it "has status 409" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card, flash_card: invalid_flash_card }, format: :json
          expect(response).to have_http_status(409)
          expect(response.content_type).to eq("application/json")
        end

        it "doesn't update the flash card" do
          request.headers.merge! headers
          patch :update, params: { id: flash_card, flash_card: different_flash_card }, format: :json
          expect(assigns(:flash_card).reload.attributes).to eq flash_card.reload.attributes
        end
      end
    end

    context "when passed the wrong user's token" do
      it "has status 401" do
        request.headers.merge! headers
        patch :update, params: { id: other_flash_card, flash_card: different_flash_card }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        patch :update, params: { id: flash_card, flash_card: different_flash_card }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end
end
