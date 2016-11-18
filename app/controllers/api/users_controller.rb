class Api::UsersController < ApplicationController
  def index
    @users = User.all

    render :index, status: 200
  end

  def show
    @user = User.find params[:id]

    render :show, status: 200
  end

  def create
    @user = User.new create_params

    if @user.save
      render :show, status: 201
    else
      render json: { errors: @user.errors.to_json }, status: 409
    end
  end

  def update
    @user = User.find params[:id]

    if @user.update_attributes update_params
      render :show, status: 200
    else
      render json: { errors: @user.errors.to_json }, status: 409
    end
  end

  def destroy
    user = User.find params[:id]

    if user.destroy
      head status: 204
    else
      render json: { errors: [ "User could not be destroyed" ] }, status: 500
    end
  end

  private
  def create_params
    params.require(:user).permit(
      :email,
      :first_name,
      :last_name,
      :password,
      :password_confirmation
    )
  end

  def update_params
    create_params
  end
end
