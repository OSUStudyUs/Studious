class Api::UsersController < ApplicationController
  before_action :authenticate_user, except: [:create]
  before_action :ensure_correct_user!, except: [:index, :create]

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def index
    @users = User.all

    render :index, status: 200
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def show
    @user = User.find params[:id]

    render :show, status: 200
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def create
    @user = User.new create_params

    if @user.save
      render json: { jwt: Knock::AuthToken.new(payload: @user.to_token_payload).token }, status: 201
    else
      render json: { errors: @user.errors }, status: 409
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def update
    @user = User.find params[:id]

    if @user.update_attributes update_params
      render :show, status: 200
    else
      render json: { errors: @user.errors }, status: 409
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def destroy
    user = User.find params[:id]

    if user.destroy
      head 204
    else
      render json: { errors: ["User could not be destroyed"] }, status: 500
    end
  end

  private
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def create_params
    params.require(:user).permit(
      :email,
      :first_name,
      :last_name,
      :password,
      :password_confirmation
    )
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def update_params
    create_params
  end

  # Private: enforces authorization such that the current_user can only modify/see themselves
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def ensure_correct_user!
    user = current_user

    unless user && user.id == params[:id].to_i
      head 401
    end
  end
end
