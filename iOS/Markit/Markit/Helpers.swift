//
//  Helpers.swift
//  Markit
//
//  Created by Trixie on 12/14/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class Helpers {
    
    static func fetchItemsThatMatch (with keyword: String, list: [String]) -> [String] {
        var currentMatchingItems = [String]()
        
        for item in list {
            if item.lowercased().contains(keyword.lowercased()) {
                currentMatchingItems.append(item)
            }
        }
        return currentMatchingItems
    }
    
    static func defaultTextField (autoCompleteTextField: AutoCompleteTextField) {
        autoCompleteTextField.autoCompleteTextFont = UIFont(name: "HelveticaNeue-Light", size: 12)!
        autoCompleteTextField.autoCompleteCellHeight = 35.0
        autoCompleteTextField.maximumAutoCompleteCount = 20
        autoCompleteTextField.hidesWhenSelected = true
        autoCompleteTextField.hidesWhenEmpty = true
        autoCompleteTextField.enableAttributedText = true
    }
    
}
