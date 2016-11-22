class Api::FlashCardSetsController < ApplicationController
  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  #   2: 11/21/16 - Joel Diener - initial implementation
  def index
    @flash_card_set = FlashCardSet.all

    render :index, status: 200
  end

  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  def show
    @user = FlashCardSet.find params[:id]

    render :show, status: 200
  end

  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  def create
  end

  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  def update
  end

  # Author: TODO
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - skeleton
  def destroy
  end
end
