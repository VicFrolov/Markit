//
//  ListingsAdvancedSearchViewController.swift
//  Markit
//
//  Created by Trixie on 10/26/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase

class ListingsAdvancedSearchView: UIView {

    @IBOutlet weak var keywords: UITextField!
    @IBOutlet weak var hubs: AutoCompleteTextField!
    @IBOutlet weak var tags: UITextView!
    @IBOutlet weak var minPrice: UITextField!
    @IBOutlet weak var maxPrice: UITextField!
    @IBOutlet weak var advancedSearchButton: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        
    }
    
}
