class AddShareTextToVariants < ActiveRecord::Migration[7.2]
  def change
    add_column :variants, :share_text, :text, null: false, default: ''
    reversible do |direction|
      direction.up do
        Variant.all.each do |variant|
          variant.update!(share_text: variant.description)
        end
      end
    end
  end
end
