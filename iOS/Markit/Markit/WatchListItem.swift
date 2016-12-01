//
//  WatchListItem.swift
//  Markit
//
//  Created by rrao on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class WatchListItem: NSObject {
    // A text description of this item.
    var text: String
    
    // A Boolean value that determines the completed state of this item.
    var completed: Bool
    
    // Returns a ToDoItem initialized with the given text and default completed value.
    init(text: String) {
        self.text = text
        self.completed = false
    }
}
