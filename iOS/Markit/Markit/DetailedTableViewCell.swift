//
//  DetailedTableViewCell.swift
//  Markit
//
//  Created by Trixie on 12/7/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class DetailedTableViewCell: UITableViewCell {

    @IBOutlet weak var itemTitle: UILabel!
    @IBOutlet weak var itemImage: UIImageView!
    @IBOutlet weak var itemTags: UILabel!
    @IBOutlet weak var itemDescription: UILabel!
    @IBOutlet weak var itemHubs: UILabel!
    @IBOutlet weak var faved: UIImageView!
    @IBOutlet weak var itemPrice: UILabel!
    @IBOutlet weak var messageSellerButton: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
