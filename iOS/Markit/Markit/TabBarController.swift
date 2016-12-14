//
//  TabBarController.swift
//  Markit
//
//  Created by Victor Frolov on 9/28/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//
//  Credit for FontAwesome: https://github.com/thii/FontAwesome.swift

import UIKit
import FontAwesome_swift

class TabBarController: UITabBarController, UITabBarControllerDelegate {
    
    private enum TabTitles: String, CustomStringConvertible {
        case Hub
        case Search
        case Sell
        case Messages
        case Profile
        
        fileprivate var description: String {
            return self.rawValue
        }
    }
    
    private var tabIcons = [
        TabTitles.Hub: FontAwesome.home,
        TabTitles.Search: FontAwesome.search,
        TabTitles.Sell: FontAwesome.dollar,
        TabTitles.Messages: FontAwesome.envelopeO,
        TabTitles.Profile: FontAwesome.user
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tabBarController?.delegate = self
        
        if let tabBarItems = tabBar.items {
            for item in tabBarItems {
                if let title = item.title,
                    let tab = TabTitles(rawValue: title),
                    let glyph = tabIcons[tab] {
                    item.image = UIImage.fontAwesomeIcon(name: glyph, textColor: UIColor.blue, size: CGSize(width: 35, height: 35))
                }
            }
        }
    }
    
//    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
//        let chatListVC = segue.destination as! ChatListViewController
//        chatListVC.currentUser = CustomFirebaseAuth().getCurrentUser()
//    }
//    
//    override func viewWillAppear(_ animated: Bool) {
//        if !CustomFirebaseAuth().isSignedIn() {
//            let loggedIn = UIStoryboard(name: "ListingsWhenNotLoggedIn", bundle: nil).instantiateInitialViewController() as! InitialNotLoggedInViewController
//            self.present(loggedIn, animated: true, completion: nil)
//        }
//    }
//    
//    func tabBarController(_ tabBarController: UITabBarController, shouldSelect viewController: UIViewController) -> Bool {
//        
//        print("WTF")
//
//        if viewController == ListingsViewController() {
//            print("HERE")
//            if CustomFirebaseAuth().isSignedIn() {
//                return true
//            } else {
//                let signedInVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "listingsLoggedIn") as! ListingsViewController
//                present(signedInVC, animated: true, completion: nil)
//                return false
//            }
//        }
//        return true
//    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
