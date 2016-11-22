require 'rails_helper'

RSpec.describe Api::CourseUsersController, type: :controller do

  describe "POST #create" do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:course) { FactoryGirl.create(:course) }
    let(:headers) { auth_header(user) }

    context "with incorrect attributes" do
      it "has status 409" do
        request.headers.merge! headers
        post :create, params: { course_id: course.id + 1 }, format: :json
        expect(response).to have_http_status(409)
      end
    end

    context "with correct attributes" do
      it "has status 201" do
        request.headers.merge! headers
        post :create, params: { course_id: course.id }, format: :json
        expect(response).to have_http_status(201)
      end

      it "saves the new user" do
        expect {
          request.headers.merge! headers
          post :create, params: { course_id: course.id }, format: :json
        }.to change(CourseUser, :count).by 1

      end
    end
  end

  describe "DELETE #destroy" do
    let!(:course_user) { FactoryGirl.create(:course_user) }
    let!(:other_course_user) { FactoryGirl.create(:course_user) }
    let(:headers) { auth_header(course_user.user) }

    context "when passed a valid token" do
      it "has status 204" do
        request.headers.merge! headers
        delete :destroy, params: { id: course_user.id }, format: :json
        expect(response).to have_http_status(204)
      end

      it "destroys the course_user" do
        request.headers.merge! headers

        expect {
          delete :destroy, params: { id: course_user.id }, format: :json
        }.to change(CourseUser, :count).by -1
      end
    end

    context "when passed the wrong course id" do
      it "has status 401" do
        request.headers.merge! headers
        delete :destroy, params: { id: other_course_user }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        delete :destroy, params: { id: course_user }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end
end
