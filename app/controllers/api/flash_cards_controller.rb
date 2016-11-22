class Api::FlashCardsController < ApplicationController
  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  def create

  end

  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  def update
    @flash_card = User.find params[:id]

    if @flash_card.update_attributes update_params
      render :show, status: 200
    else
      render json: { errors: @flash_card.errors }, status: 409
    end
  end

  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  def destroy
    flash_card = FlashCard.find params[:id]

    if flash_card.destroy
      head 204
    else
      render json: { errors: ["Flash card could not be destroyed"] }, status: 500
    end
  end

  private
  # Author: Joel Diener
  # Revisions:
  #   1: 11/21/16 - Joel Diener - initial implementation
  def create_params
    params.require(:flash_card).permit(
      :email,
      :first_name,
      :last_name,
      :password,
      :password_confirmation
    )
  end

  # Author: Joel Diener
  # Revisions:
  #   1: 11/21/16 - Joel Diener - initial implementation
  def update_params
    create_params
  end
end
