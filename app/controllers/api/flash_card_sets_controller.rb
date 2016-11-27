class Api::FlashCardSetsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_visible, only: [:show]
  before_action :ensure_owner_of_set, except: [:index, :show, :create]

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def index
    @flash_card_sets = FlashCardSet.all

    render :index, status: 200
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def show
    @flash_card_set ||= FlashCardSet.find params[:id]

    render :show, status: 200
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def create
    @flash_card_set ||= FlashCardSet.new create_params

    if params[:study_group_id]
      @flash_card_set.study_group_id = params[:study_group_id]
    elsif params[:user_id]
      @flash_card_set.user_id = params[:user_id]
    end

    if @flash_card_set.save
      render :show, status: 201
    else
      render json: { errors: @flash_card_set.errors }, status: 409
    end
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def update
    @flash_card_set ||= FlashCardSet.find params[:id]

    if @flash_card_set.update_attributes update_params
      render :show, status: 200
    else
      render json: { errors: @flash_card_set.errors }, status: 409
    end
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def destroy
    @flash_card_set ||= FlashCardSet.find params[:id]

    if @flash_card_set.destroy
      head 204
    else
      render json: { errors: ["Flash card set could not be destroyed"] }, status: 500
    end
  end

  private
  # Author: Mary Zhou
  # Revisions:
  #   1: 11/18/16 - Mary Zhou - initial implementation
  def create_params
    params.require(:flash_card_set).permit(
      :public
    )
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/18/16 - Mary Zhou - initial implementation
  def update_params
    create_params
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/27/16 - Kyle Thompson - initial implementation
  def ensure_visible
    user = current_user
    @flash_card_set = FlashCardSet.find params[:id]

    unless user == @flash_card_set.user || @flash_card_set.study_group&.has_member?(user) || @flash_card_set.public
      head 401
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/27/16 - Kyle Thompson - initial implementation
  def ensure_owner_of_set
    user = current_user
    @flash_card_set = FlashCardSet.find params[:id]

    unless user == @flash_card_set.user || @flash_card_set.study_group&.has_member?(user)
      head 401
    end
  end
end
