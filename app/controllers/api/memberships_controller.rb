class Api::MembershipsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_user_has_membership!, only: [:destroy]
  before_action :ensure_user_in_study_group!, only: [:approve]

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/25/16 - Sean Whitehurst - initial implementation
  #   3: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def create
    @membership = Membership.new({ user_id: current_user.id, study_group_id: params[:study_group_id] })

    if @membership.save
      head 201
    else
      render json: { resource: "membership", errors: @membership.errors }, status: 409
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/25/16 - Sean Whitehurst - initial implementation
  #   3: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def destroy
    membership = Membership.find params[:id]

    if membership.destroy
      head 204
    else
      render json: { resource: "membership", errors: errors_hash_for(Membership, "could not be destroyed") }, status: 500
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 12/02/16 - Kyle Thompson - initial implementation
  def approve
    @membership = Membership.find params[:id]

    if @membership.update_attributes(pending: false)
      render :show, status: 200
    else
      render json: { resource: "membership", errors: errors_hash_for(Membership, "could not be approved") }, status: 500
    end
  end

  private
  # Private: enforces authorization such that the current_user belongs_to the membership in question
  #
  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/27/16 - Sean Whitehurst - initial implementation
  def ensure_user_has_membership!
    user_from_membership = Membership.find(params[:id]).user

    unless current_user && user_from_membership && current_user.id == user_from_membership.id
      head 401
    end
  end

  # Private: ensures current_user is a member of the study group
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 12/02/16 - Kyle Thompson - initial implementation
  def ensure_user_has_membership!
    @membership = Membership.find(params[:id])
    study_group = @membership.study_group

    unless study_group.has_member?(current_user)
      head 401
    end
  end
end
