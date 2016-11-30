//
//  ListingsTableViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/10/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import SwiftyJSON

class ListingsTableViewController: UITableViewController, UISearchBarDelegate, UISearchResultsUpdating {
    var ref:            FIRDatabaseReference!
    var refHandle:      FIRDatabaseHandle?
    var itemsRef:       FIRDatabaseReference!
    var itemsByHubRef:  FIRDatabaseReference!
    var itemsByUserRef: FIRDatabaseReference!
    var tagRef:         FIRDatabaseReference!
    var userRef:        FIRDatabaseReference!
    var usernameRef:    FIRDatabaseReference!
    var hubsRef:        FIRDatabaseReference!
    var itemImageRef:   FIRStorageReference!
    var itemList      = [Item]()
    
//  These are for searching the list of items
    let searchController = UISearchController(searchResultsController: nil)
    var filteredItems = [Item]()
    var didReceiveAdvancedSearchQuery: Bool!
    
    override func viewDidLoad() {
//        self.tableView.contentOffset = UIEdgeInsetsMake()
        super.viewDidLoad()
        self.ref            = FIRDatabase.database().reference()
        self.itemImageRef   = FIRStorage.storage().reference()
        self.itemsRef       = ref.child("items")
        self.itemsByHubRef  = ref.child("itemsByHub")
        self.itemsByUserRef = ref.child("itemsByUser")
        self.userRef        = ref.child("users")
        self.usernameRef    = ref.child("usernames")
        self.tagRef         = ref.child("tags")
        self.hubsRef        = ref.child("hubs")
        
        self.didReceiveAdvancedSearchQuery = false
        self.searchController.loadViewIfNeeded()
        fetchItems()
        searchItems()
    }
    
    func updateSearchResults(for searchController: UISearchController) {
        filterContentForSearchText(searchText: searchController.searchBar.text!)
    }
    
    func filterContentForSearchText(searchText: String, scope: String = "All") {
        self.filteredItems = itemList.filter { item in
            return (item.title!.lowercased().contains(searchText.lowercased()))
        }
        self.tableView.reloadData()
    }
    
    func searchItems() {
        searchController.searchResultsUpdater = self
        searchController.hidesNavigationBarDuringPresentation = false
        searchController.dimsBackgroundDuringPresentation = false
        searchController.searchBar.delegate = self
        searchController.searchBar.placeholder = "Search by item"
        searchController.searchBar.sizeToFit()
        searchController.searchBar.frame.size.width = 100
        
//        let frame = CGRect(x: 0, y: 0, width: 100, height: 44)
//        let titleView = UIView(frame: frame)
//        searchController.searchBar.backgroundImage = UIImage()
//        searchController.searchBar.frame = frame
//        titleView.addSubview(searchController.searchBar)
        
        definesPresentationContext = true
        self.tableView.tableHeaderView = searchController.searchBar
        
    }
    
    func fetchItems() {
        self.refHandle = self.itemsRef!.queryOrdered(byChild: "title")
                                       .observe(.childAdded, with: { (snapshot) -> Void in

            if let dictionary = snapshot.value as? [String: AnyObject] {
//                print("The dict is \(dictionary)")
                
                let item     = Item()
                item.uid     = dictionary["uid"] as! String?
                item.date    = dictionary["date"] as! String?
                item.desc    = dictionary["description"] as! String?
                item.imageID = dictionary["id"] as! String?
                item.title   = dictionary["title"] as! String?

                if let price = dictionary["price"] as! String? {
                    item.price = price
                } else {
                    item.price = "0.01"
                }
                
                if let tags = dictionary["tags"] as? Array as [String]? {
                    item.tags = tags
                } else {
                    item.tags = [""]
                }
                
                if let hub = dictionary["hubs"] as? Array as [String]? {
                    item.hubs = hub
                } else {
                    item.hubs = [""]
                }
                
                if let favorites = dictionary["favorites"] as? Array as [String]? {
                    item.favorites = favorites
                } else {
                    item.favorites = [""]
                }
                
                self.userRef.child(dictionary["uid"] as! String)
                            .child("username")
                            .observe(.value, with: { (snapshot) in
                    item.username = snapshot.value as! String?
                })
                
                self.getImage(imageID: item.imageID!, item: item)

                self.itemList.append(item)
            }
            self.tableView.reloadData()
        })
        
    }
    
    func getImage (imageID: String, item: Item) {
//        self.itemImageRef!.child("images/itemImages/\(imageID)/imageOne").downloadURL(completion: { (url, error) -> Void in
        self.itemImageRef!.child("images/itemImages/\(imageID)/imageOne").data(withMaxSize: 1 * 1024 * 1024) { (data, error) in
            DispatchQueue.main.async(execute: {
                if (error != nil) {
                    print("Image download failed: \(error?.localizedDescription)")
                    return
                }
//                let imageURL = url
//                let imageData = NSData(contentsOf: imageURL! as URL)
//                item.image = UIImage(data: imageData! as Data)
                item.image = UIImage(data: data!)
                self.tableView.reloadData()
                return
            })
//        })
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        self.tableView.contentOffset = CGPoint (x: 0, y: self.searchController.searchBar.frame.size.height)
        self.tableView.reloadData()
    }
    
    @IBAction func cancelAdvancedSearch (segue: UIStoryboardSegue) {}
    
    @IBAction func unwindSearchButton (segue: UIStoryboardSegue) {
        self.didReceiveAdvancedSearchQuery = true
        
//        let searchQuery = self.itemsRef.queryOrdered(byChild: "title").observe(.value, with: { (snapshot) in
//            for childSnapshot in snapshot.children {
//                print("Search \(snapshot)")
//            }
//        })

        
        var hasTag: Bool  = false
        var useTags: Bool = false
        var tagList: [String] = []

//        var hasKeyWord: Bool = false
//        var hasHub: Bool = false
        let advancedSearchVC = segue.source as! ListingsAdvancedSearchViewController
        let minPrice         = advancedSearchVC.advancedSearchContainerView.minPrice.text
        let maxPrice         = advancedSearchVC.advancedSearchContainerView.maxPrice.text
//        var hubs = advancedSearchVC.advancedSearchContainerView.hubs.text
        let keywords         = advancedSearchVC.advancedSearchContainerView.keywords.text
        let tags             = advancedSearchVC.advancedSearchContainerView.tags.text
        
        if keywords! != "" {
//            hasKeyWord = true
        }
        
        if tags! != "" {
            tagList = (tags!.characters.split { $0 == " " }).map(String.init)
            useTags = true
        }
        
//        if hubs! != "" {
//            hasHub = true
//        }
        
        
        self.filteredItems = itemList.filter { item in
            let keywordQuery     = item.title!.lowercased().contains((keywords?.lowercased())!)
//            let hubsQuery = item.hubs!.lowercased().contains((keywords?.lowercased())!)
            let minPriceQuery    = NumberFormatter().number(from: minPrice!)?.floatValue
            let maxPriceQuery    = NumberFormatter().number(from: maxPrice!)?.floatValue
            let itemPriceFloat   = NumberFormatter().number(from: item.price!)?.floatValue
            let withinPriceRange = itemPriceFloat! <= maxPriceQuery! && itemPriceFloat! >= minPriceQuery!
            
            if useTags {
                for tag in tagList {
                    if item.tags!.contains(tag.lowercased()) {
                        hasTag = true
                    }
                }
                return (keywordQuery && withinPriceRange && hasTag)
            }
            return (keywordQuery && withinPriceRange)
        }
//        self.tableView.reloadData()
    }


    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if self.didReceiveAdvancedSearchQuery || self.searchController.isActive && self.searchController.searchBar.text != "" {
            return self.filteredItems.count
        }
        return self.itemList.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "Cell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier,
                                                 for: indexPath) as! ListingsTableViewCell
        let item: Item
        
        if self.didReceiveAdvancedSearchQuery || self.searchController.isActive && self.searchController.searchBar.text != "" {
            item = self.filteredItems[indexPath.row]
            
            if indexPath.row >= self.filteredItems.count - 1 {
                self.didReceiveAdvancedSearchQuery = false
            }
        } else {
            item = itemList[indexPath.row]
        }
        
        // Configure the cell...
        cell.itemLabel?.text           = item.title
        cell.thumbnailImageView?.image = item.image
        cell.priceLabel?.text          = item.price
        cell.userLabel?.text           = item.username
        return cell
    }
}
