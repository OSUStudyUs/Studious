require 'rails_helper'

RSpec.describe Api::StudyGroupsController, type: :controller do
  describe "GET #index" do
    let!(:study_group) { FactoryGirl.create(:study_group) }
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
        expect(assigns(:study_groups).to eq [study_groups]
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
end
