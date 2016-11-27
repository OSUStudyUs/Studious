class Api::MembershipsController < ApplicationController
  before_action :authenticate_user


  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/25/16 - Sean Whitehurst - initial implementation
  def create
    @membership = Membership.new({ user_id: current_user.id, study_group_id: params[:study_group_id] })
  
    if @membership.save
      head 201
    else
      render json: { errors: @membership.errors }, status: 409
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/25/16 - Sean Whitehurst - initial implementation
  def destroy
    membership = Membership.find params[:id]

    if membership.destroy
      head 204
    else
      render json: { errors: ["Failed to leave group"] }, status: 500
    end
  end
end
