class Api::StudyGroupsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_user_in_group!, except: [:index, :create, :update, :destroy]
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
    @study_group = StudyGroup.find params[:id]

    render :show, status: 200
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  def create
    @study_group = StudyGroup.new create_params
    user = current_user

    if @study_group.save
      @study_group.save_for user
      render :show, status: 201
    else
      render json: { errors: @study_group.errors }, status: 409
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  def update
    @study_group = StudyGroup.find params[:id]

    if @study_group.update_attributes update_params
      render :show, status: 200
    else
      render json: { errors: @study_group.errors }, status: 409
    end
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/23/16 - Sean Whitehurst - initial implementation
  def destroy
    study_group = StudyGroup.find params[:id]

    if study_group.destroy
      head 204
    else
      render json: { errors: ["Study Group could not be destroyed"] }, status: 500
    end
  end
end

private
  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  def create_params
    params.require(:study_group).permit(
      :name
    )
  end

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  def update_params
    create_params
  end

  # Private: requires the user to belong to a group to be able to see it
  #
  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  def ensure_user_in_group!
    user = current_user
    study_group = StudyGroup.find params[:id]

    unless study_group.has_member? user
      head 401
    end
  end

  # Private: requires the user to be an admin to update or destroy a group

  # Author: Sean Whitehurst
  # Revisions:
  #   1: 11/23/16 - Sean Whitehurst - initial implementation
  def ensure_user_is_admin!
    user = current_user
    study_group = StudyGroup.find params[:id]

    unless study_group.has_admin? user
      head 401
    end
  end
end
