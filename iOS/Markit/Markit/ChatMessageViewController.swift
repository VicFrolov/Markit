//
//  ChatMessageViewController.swift
//  Markit
//
//  Created by Trixie on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import JSQMessagesViewController

final class ChatMessageViewController: JSQMessagesViewController {
    
    var ref:     FIRDatabaseReference!
    var userRef: FIRDatabaseReference!
    var chatRef: FIRDatabaseReference!
    var chatRefHandle: FIRDatabaseHandle?
    lazy var outgoingBubbleImageView: JSQMessagesBubbleImage = self.setupOutgoingBubble()
    lazy var incomingBubbleImageView: JSQMessagesBubbleImage = self.setupIncomingBubble()
    var messages = [JSQMessage]()
    
//    var sender: String!

//    var conversation: Conversation? {
//        didSet {
//            
//        }
//    }
    
    func reloadMessagesView() {
        self.collectionView?.reloadData()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupNavBar()
        
        print("In chatmessageviewcontroller")

        self.ref = FIRDatabase.database().reference()
        self.userRef = ref.child("users")
        self.chatRef = self.ref.child("chat")
        
//        self.setup()
//        self.addDemoMessages()
        
        collectionView!.collectionViewLayout.incomingAvatarViewSize = CGSize.zero
        collectionView!.collectionViewLayout.outgoingAvatarViewSize = CGSize.zero
    }
    
    func setupNavBar() {
        let deviceBounds  = UIScreen.main.bounds
        let width         = deviceBounds.size.width
        let navigationBar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: width, height: 64))
        let navItem       = UINavigationItem(title: "Message \(self.senderDisplayName!)")
        let backItem      = UIBarButtonItem(barButtonSystemItem: .done,
                                            target: self,
                                            action: #selector(goBack))
        
        navItem.leftBarButtonItem = backItem
        
        self.view.addSubview(navigationBar)
        navigationBar.setItems([navItem], animated: false)
    }
    
    func goBack() {
        dismiss(animated: true, completion: nil)
    }
    
    override func viewDidAppear(_ animated: Bool) {
//        addMessage(withId: "FOO", name: "Adrian", text: "FUCK YOU")
//        addMessage(withId: senderId, name: "Me", text: "FUCK YO MAMA")
//        addMessage(withId: senderId, name: "Me", text: "SHE WASN'T EVEN WORTH IT")
//        finishReceivingMessage()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    private func observeConversation() {
        self.chatRefHandle = self.chatRef!.observe(.childAdded, with: { (snapshot) -> Void in
//            let message = snapshot.value as! Dictionary<String, AnyObject>
//            let messageID = snapshot.key
//            
//            if let text = message["text"] as! String!, text.characters.count > 0 {
//            }
        })
    }
    
    // MARK: JSQMessage overrides
    override func collectionView (_ collectionView: JSQMessagesCollectionView!, messageDataForItemAt indexPath: IndexPath!) -> JSQMessageData! {
        return messages[indexPath.item]
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return messages.count
    }
    
    override func collectionView(_ collectionView: JSQMessagesCollectionView!, messageBubbleImageDataForItemAt indexPath: IndexPath!) -> JSQMessageBubbleImageDataSource! {
        let message = messages[indexPath.item]
        if message.senderId == senderId {
            return outgoingBubbleImageView
        } else {
            return incomingBubbleImageView
        }
    }
    
    override func collectionView(_ collectionView: JSQMessagesCollectionView!, avatarImageDataForItemAt indexPath: IndexPath!) -> JSQMessageAvatarImageDataSource! {
        return nil
    }
    
    private func setupOutgoingBubble() -> JSQMessagesBubbleImage {
        let bubbleImageFactory = JSQMessagesBubbleImageFactory()
        return bubbleImageFactory!.outgoingMessagesBubbleImage(with: UIColor.jsq_messageBubbleBlue())
    }
    
    private func setupIncomingBubble() -> JSQMessagesBubbleImage {
        let bubbleImageFactory = JSQMessagesBubbleImageFactory()
        return bubbleImageFactory!.incomingMessagesBubbleImage(with: UIColor.jsq_messageBubbleLightGray())
    }
    
    private func addMessage(withId id: String, name: String, text: String) {
        if let message = JSQMessage(senderId: id, displayName: name, text: text) {
            messages.append(message)
        }
    }
}

//MARK: - Sample messages
//extension ChatMessageViewController {
//    func addDemoMessages() {
//        for i in 1...10 {
//            let sender = (i % 2 == 0) ? "Server" : self.senderId
//            let messageContent = "Message nr. \(i)"
//            let message = JSQMessage(senderId: sender, displayName: sender, text: messageContent)
//            self.messages += [message]
//        }
//        self.reloadMessagesView()
//    }
//    
//    func setup() {
//        self.senderId = UIDevice.current.identifierForVendor?.uuidString
//        self.senderDisplayName = UIDevice.current.identifierForVendor?.uuidString
//    }
//}
