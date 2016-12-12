//
//  Conversations.swift
//  Markit
//
//  Created by Trixie on 12/1/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import Foundation

internal class Conversations: NSObject {
    internal let id: String
    internal let receiverID: String
    internal let senderID: String
    
    init(id: String, receiverID: String, senderID: String) {
        self.id = id
        self.receiverID = receiverID
        self.senderID = senderID
    }
}
