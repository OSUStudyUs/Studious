class Api::FlashCardSetsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_user_or_study_group_is_present, except: [:index, :create]
  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def index
    @flash_card_sets = FlashCardSets.all

    render :index, status: 200
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def show
    @flash_card_set = FlashCardSets.find params[:id]

    render :show, status: 200
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def create
    @flash_card_set = FlashCardSets.new create_params

    if @flash_card_set.save
      render json: { jwt: Knock::AuthToken.new(payload: @flash_card_set.to_token_payload).token }, status: 201
    else
      render json: { errors: @flash_card_set.errors }, status: 409
    end
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/22/16 - Mary Zhou - initial implementation
  def update
    @flash_card_set = FlashCardSets.find params[:id]

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
    flash_card_set = FlashCardSets.find params[:id]

    if flash_card_set.destroy
      head 204
    else
      render json: { errors: ["Flashcard set could not be destroyed"] }, status: 500
    end
  end

  private
  # Author: Mary Zhou
  # Revisions:
  #   1: 11/18/16 - Mary Zhou - initial implementation
  def create_params
    params.require(:flash_card_sets).permit(
      :question,
      :answer
    )
  end

  # Author: Mary Zhou
  # Revisions:
  #   1: 11/18/16 - Mary Zhou - initial implementation
  def update_params
    create_params
  end
end
