//
//  DetailedTableViewCell.swift
//  Markit
//
//  Created by Trixie on 12/7/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class DetailedTableView: UITableView {

    @IBOutlet weak var itemImageView: UIImageView!
    @IBOutlet weak var itemPrice: UILabel!
    @IBOutlet weak var itemTitle: UILabel!
    @IBOutlet weak var itemDescription: UILabel!
    @IBOutlet weak var itemTags: UILabel!
    @IBOutlet weak var itemHubs: UILabel!
    @IBOutlet weak var messageSellerButton: UIButton!
    @IBOutlet weak var faved: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        messageSellerButton.layer.cornerRadius = 10        
    }

}
