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
end
