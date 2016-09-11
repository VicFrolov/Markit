//
//  ListingsTableViewCell.swift
//  Markit
//
//  Created by Victor Frolov on 9/10/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class ListingsTableViewCell: UITableViewCell {
    
    @IBOutlet var userLabel: UILabel!
    @IBOutlet var itemLabel: UILabel!
    @IBOutlet var priceLabel: UILabel!
    @IBOutlet var thumbnailImageView: UIImageView!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
