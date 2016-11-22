require 'rails_helper'

RSpec.describe Api::CoursesController, type: :controller do
  describe "GET #index" do
    let!(:course) { FactoryGirl.create(:course) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed a valid token" do
      it "has status 200" do
        request.headers.merge! headers
        get :index, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @courses" do
        request.headers.merge! headers
        get :index, format: :json
        expect(assigns(:courses)).to eq [course]
      end

      it "renders the index template" do
        request.headers.merge! headers
        get :index, format: :json
        expect(response).to render_template(:index)
      end
    end
  end

  describe "GET #show" do
    let!(:course) { FactoryGirl.create(:course) }
    let!(:user) { FactoryGirl.create(:user) }
    let(:headers) { auth_header(user) }

    context "when passed the correct user's token" do
      it "has status 200" do
        request.headers.merge! headers
        get :show, params: { id: course }, format: :json
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/json")
      end

      it "assigns @course" do
        request.headers.merge! headers
        get :show, params: { id: course }, format: :json
        expect(assigns(:course)).to eq course
      end

      it "renders the show template" do
        request.headers.merge! headers
        get :show, params: { id: course }, format: :json
        expect(response).to render_template(:show)
      end
    end
  end
end
