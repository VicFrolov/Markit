//
//  ChatView.swift
//  Markit
//
//  Created by Trixie on 11/29/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class ChatTableViewCell: UITableViewCell {
    @IBOutlet weak var chatUsername: UILabel!
    @IBOutlet weak var chatImageView: UIImageView!
    @IBOutlet weak var chatMessagePreview: UILabel!
    @IBOutlet weak var lastSent: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
//        let tap = UITapGestureRecognizer(target: self, action: #selector(getConversation))
//        self.addGestureRecognizer(tap)
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
    func getConversation (sender: UITapGestureRecognizer) {
        print("I'll get you those conversations")
    }

}
