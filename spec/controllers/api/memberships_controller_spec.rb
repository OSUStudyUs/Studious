require 'rails_helper'

RSpec.describe Api::MembershipsController, type: :controller do
  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/28/16 - Sean Whitehurst - initial implementation
  describe "POST #create" do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:study_group) { FactoryGirl.create(:study_group) }
    let(:headers) { auth_header(user) }

    context "with incorrect attributes" do
      it "has status 409" do
        request.headers.merge! headers
        post :create, params: { study_group_id: study_group.id + 1 }, format: :json
        expect(response).to have_http_status(409)
      end
    end

    context "with correct attributes" do
      it "has status 201" do
        request.headers.merge! headers
        post :create, params: { study_group_id: study_group.id }, format: :json
        expect(response).to have_http_status(201)
      end

      it "saves the new membership" do
        expect {
          request.headers.merge! headers
          post :create, params: { study_group_id: study_group.id }, format: :json
        }.to change(Membership, :count).by 1

      end
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/28/16 - Sean Whitehurst - initial implementation
  describe "DELETE #destroy" do
    let!(:membership) { FactoryGirl.create(:membership) }
    let!(:other_membership) { FactoryGirl.create(:membership) }
    let(:headers) { auth_header(membership.user) }

    context "when passed a valid token" do
      it "has status 204" do
        request.headers.merge! headers
        delete :destroy, params: { id: membership.id }, format: :json
        expect(response).to have_http_status(204)
      end

      it "destroys the membership" do
        request.headers.merge! headers

        expect {
          delete :destroy, params: { id: membership.id }, format: :json
        }.to change(Membership, :count).by -1
      end
    end

    context "when passed the wrong membership id" do
      it "has status 401" do
        request.headers.merge! headers
        delete :destroy, params: { id: other_membership }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "when not passed a valid token" do
      it "has status 401" do
        delete :destroy, params: { id: membership }, format: :json
        expect(response).to have_http_status(401)
      end
    end
  end
end
