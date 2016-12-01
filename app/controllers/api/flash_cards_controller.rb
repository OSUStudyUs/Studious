class Api::FlashCardsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_owner_of_set, except: [:create]
  before_action :ensure_owner_of_set_create, only: [:create]

  # Author: Joel Diener
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  #   3: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def create
    @flash_card ||= FlashCard.new create_params

    if params[:flash_card_set_id]
      @flash_card.flash_card_set_id = params[:flash_card_set_id]
    end

    if @flash_card.save
      render :show, status: 201
    else
      render json: { resource: "flashCard", errors: @flash_card.errors }, status: 409
    end
  end

  # Author: Joel Diener
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  #   3: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def update
    @flash_card ||= FlashCard.find params[:id]

    if @flash_card.update_attributes update_params
      render :show, status: 200
    else
      render json: { resource: "flashCard", errors: @flash_card.errors }, status: 409
    end
  end

  # Author: Joel Diener
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  #   3: 11/27/16 - Kyle Thompson - use errors_hash_for helper
  #   4: 12/01/16 - Kyle Thompson - Add resourse name to errors JSON
  def destroy
    @flash_card ||= FlashCard.find params[:id]

    if @flash_card.destroy
      head 204
    else
      render json: { resource: "flashCard", errors: errors_hash_for(FlashCard, "could not be destroyed") }, status: 500
    end
  end

  private
  # Author: Joel Diener
  # Revisions:
  #   1: 11/21/16 - Joel Diener - initial implementation
  def create_params
    params.require(:flash_card).permit(
      :question,
      :answer
    )
  end

  # Author: Joel Diener
  # Revisions:
  #   1: 11/21/16 - Joel Diener - initial implementation
  def update_params
    create_params
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/27/16 - Kyle Thompson - initial implementation
  def ensure_owner_of_set_create
    user = current_user
    flash_card_set = FlashCardSet.find params[:flash_card_set_id]

    unless user == flash_card_set.user || flash_card_set.study_group&.has_member?(user)
      head 401
    end
  end

  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/27/16 - Kyle Thompson - initial implementation
  def ensure_owner_of_set
    user = current_user
    @flash_card = FlashCard.find params[:id]
    flash_card_set = @flash_card.flash_card_set

    unless user == flash_card_set.user || flash_card_set.study_group&.has_member?(user)
      head 401
    end
  end
end
