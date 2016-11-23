json.flashCardSets do
	json.array! @flash_card_sets.each do |flash_card_set|
		json.partial! 'api/flash_card_sets/flash_card_set', flash_card_set: flash_card_set
	end
end
