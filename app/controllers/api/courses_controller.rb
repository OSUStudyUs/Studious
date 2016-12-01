class Api::CoursesController < ApplicationController
  before_action :authenticate_user

  # Author: Joel Diener
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  def index
    @courses = Course.all

    render :index, status: 200
  end

  # Author: Joel Diener
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  def show
    @course = Course.find params[:id]

    render :show, status: 200
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 12/01/16 - Kyle Thompson - initial implementation
  def create
    @course = Course.new create_params

    if @course.save
      render :show, status: 201
    else
      render json: { resource: "course", errors: @course.errors }, status: 409
    end
  end

  private
  # Author: Kyle Thompson
  # Revisions:
  #   1: 12/01/16 - Kyle Thompson - initial implementation
  def create_params
    params.require(:course).permit(
      :department,
      :name,
      :number
    )
  end
end
