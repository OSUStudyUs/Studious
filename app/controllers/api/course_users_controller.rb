class Api::CourseUsersController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_user_in_course!, except: [:create]

  # Author: Alex Tareshawty
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Alex Tareshawty - Initial Implementation
  def create
  end

  # Author: Alex Tareshawty
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Alex Tareshawty - Initial Implementation
  def destroy
    course_user = CourseUser.find params[:id]

    if course_user.destroy
      head 204
    else
      render json: { errors: ["User could not be destroyed"] }, status: 500
    end
  end


  private

  # Private: enforces authorization such that the current_user belongs_to the course_user in question
  #
  # Author: Alex Tareshawty
  # Revisions:
  #   1: 11//22/16 - Alex Tareshawty - initial implementation
  def ensure_user_in_course!
    user_from_course_user = CourseUser.find params[:id]

    unless current_user && user_from_course_user && current_user.id == user_from_course_user.id
      head 401
    end
  end
end
