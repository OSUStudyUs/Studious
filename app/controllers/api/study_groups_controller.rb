class Api::StudyGroupsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_visible!, except: [:index, :create, :update, :destroy]
  before_action :ensure_user_is_admin!, except: [:index, :show, :create]

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  def index
    @study_groups = StudyGroup.all

    render :index, status: 200
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  def show
    @study_group ||= StudyGroup.find params[:id]

    render :show, status: 200
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  #   3: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def create
    @study_group = StudyGroup.new create_params
    user = current_user

    if @study_group.save_for user
      render :show, status: 201
    else
      render json: { resource: "studyGroup", errors: @study_group.errors }, status: 409
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  #   3: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def update
    if @study_group.update_attributes update_params
      render :show, status: 200
    else
      render json: { resource: "studyGroup", errors: @study_group.errors }, status: 409
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  #   3: 11/27/16 - Kyle Thompson - use errors_hash_for helper
  #   4: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def destroy
    study_group = StudyGroup.find params[:id]

    if study_group.destroy
      head 204
    else
      render json: { resource: "studyGroup", errors: errors_hash_for(StudyGroup, "could not be destroyed") }, status: 500
    end
  end

  private
  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  def create_params
    params.require(:study_group).permit(
      :name,
      :accepting_new_members
    )
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  def update_params
    create_params
  end

  # Private: ensures that the study group can be seen by the user
  #
  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  #   2: 12/01/16 - Kyle Thompson - 404 on private groups
  #   3: 12/01/16 - Kyle Thompson - rename to ensure_visible!
  def ensure_visible!
    user = current_user
    @study_group = StudyGroup.find params[:id]

    if @study_group.accepting_new_members && !@study_group.has_member?(user)
      head 401
    elsif !@study_group.accepting_new_members && !@study_group.has_member?(user)
      head 404
    end
  end

  # Private: requires the user to be an admin to update or destroy a group

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  def ensure_user_is_admin!
    user = current_user
    @study_group = StudyGroup.find params[:id]

    unless @study_group.has_admin? user
      head 401
    end
  end
end
