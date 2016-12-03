class AddPendingToMembership < ActiveRecord::Migration[5.0]
  def change
    add_column :memberships, :pending, :boolean, default: true
  end
end
