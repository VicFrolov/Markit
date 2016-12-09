//
//  MainTabBarController.swift
//  Markit
//
//  Created by Trixie on 12/7/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//
//  Credit for FontAwesome: https://github.com/thii/FontAwesome.swift

import UIKit
import FontAwesome_swift

class MainTabBarController: UITabBarController {
    
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

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
    }
}
