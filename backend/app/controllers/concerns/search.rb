module Search
  # AND検索
  def and_search(input, target, model)
    keywords = input.split(/[[:blank:]]+/)

    # 初期値
    elements = []

    # AND検索
    keywords.each_with_index do |keyword, index|
      if index == 0
        elements = model.where("#{target} LIKE ?", "%#{keyword}%")
      else
        elements = elements & model.where("#{target} LIKE ?", "%#{keyword}%")
      end
    end
    elements
  end
end
