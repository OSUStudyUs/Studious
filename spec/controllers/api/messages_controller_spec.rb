require 'rails_helper'

RSpec.describe Api::MessagesController, type: :controller do
  describe "GET #index" do
    let!(:chatroom) { FactoryGirl.create(:chatroom, :for_a_user, :with_messages) }
    let(:headers) { auth_header(chatroom.user) }

    context "when passed a valid token" do
      it "has status 200" do
        request.headers.merge! headers
        get :index, params: { chatroom_id: chatroom }, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @messages" do
        request.headers.merge! headers
        get :index, params: { chatroom_id: chatroom }, format: :json
        expect(assigns(:messages)).to eq chatroom.messages
      end

      it "renders the index template" do
        request.headers.merge! headers
        get :index, params: { chatroom_id: chatroom }, format: :json
        expect(response).to render_template(:index)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        get :index, params: { chatroom_id: chatroom }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end
end
