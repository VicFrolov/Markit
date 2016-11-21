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
    var restaurantImages = ["cafedeadend.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "cafedeadend.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "cafedeadend.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "cafedeadend.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "cafedeadend.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "cafedeadend.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg", "homei.jpg", "teakha.jpg", "cafeloisl.jpg", "petiteoyster.jpg", "forkeerestaurant.jpg"]
    var ref: FIRDatabaseReference!
    var refHandle: FIRDatabaseHandle?
    var itemsRef: FIRDatabaseReference!
    var itemsByHubRef: FIRDatabaseReference!
    var itemsByUserRef: FIRDatabaseReference!
    var tagRef: FIRDatabaseReference!
    var userRef: FIRDatabaseReference!
    var itemList = [Item]()
    
//  These are for searching the list of items
    let searchController = UISearchController(searchResultsController: nil)
    var filteredItems = [Item]()
    var didReceiveAdvancedSearchQuery: Bool!
    
    override func viewDidLoad() {
//        self.tableView.contentOffset = UIEdgeInsetsMake()
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
        self.itemsRef = ref.child("items")
        self.itemsByHubRef = ref.child("itemsByHub")
        self.itemsByUserRef = ref.child("itemsByUser")
        self.userRef = ref.child("usernames")
        self.tagRef = ref.child("tags")
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
            return (item.label!.lowercased().contains(searchText.lowercased()))
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
        refHandle = itemsRef!.observe(.childAdded, with: { (snapshot) -> Void in

            if let dictionary = snapshot.value as? [String: AnyObject] {
                print("The dict is \(dictionary)")
                
                let item = Item()
                item.uid = dictionary["uid"] as! String?
                item.username = dictionary["seller"] as! String?
                
                // This is temporary since we have inconsistent data
                if dictionary["price"] is Float {
                    item.price = dictionary["price"] as! Float?
                } else if dictionary["price"] is String {
                    item.price = Float((dictionary["price"] as! String?)!)
                } else {
                    item.price = 0.01
                }
                
                // This is temporary since we have inconsistent data.
                if let label = dictionary["item"] as! String? {
                    item.label = label
                } else {
                    item.label = dictionary["title"] as! String?
                }
                
                if let tags = dictionary["tags"] as? Array as [String]? {
                    item.tags = tags
                } else if dictionary["tags"] is String {
                    let tag = dictionary["tags"] as! String
                    item.tags = [tag]
                    print("item.tags \(item.tags)")
                } else {
                    item.tags = [""]
                }
                
                item.desc = dictionary["description"] as! String?
                
                self.itemList.append(item)
            }
            self.tableView.reloadData()
        })
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        self.tableView.contentOffset = CGPoint (x: 0, y: self.searchController.searchBar.frame.size.height)
        self.tableView.reloadData()
    }
    
    @IBAction func cancelAdvancedSearch (segue: UIStoryboardSegue) {}
    
    @IBAction func unwindSearchButton (segue: UIStoryboardSegue) {
        self.didReceiveAdvancedSearchQuery = true
        let advancedSearchVC = segue.source as! ListingsAdvancedSearchViewController
        let minPrice = advancedSearchVC.advancedSearchContainerView.minPrice.text
        let maxPrice = advancedSearchVC.advancedSearchContainerView.maxPrice.text
//        var hubs = advancedSearchVC.advancedSearchContainerView.hubs.text
        let tags = advancedSearchVC.advancedSearchContainerView.tags.text
        
        var useTags: Bool = false
        var tagList: [String] = []
        if tags! != "" {
            print("IM HERE")
            tagList = (tags!.characters.split { $0 == " " }).map(String.init)
            useTags = true
        }
        
        let keywords = advancedSearchVC.advancedSearchContainerView.keywords.text
        
        self.filteredItems = itemList.filter { item in
            let keywordQuery = item.label!.lowercased().contains((keywords?.lowercased())!)
//            let hubsQuery = item.hubs!.lowercased().contains((keywords?.lowercased())!)
            var hasTag: Bool  = false
            let minPriceQuery = NumberFormatter().number(from: minPrice!)?.floatValue
            let maxPriceQuery = NumberFormatter().number(from: maxPrice!)?.floatValue
            let withinPriceRange = item.price! <= maxPriceQuery! && item.price! >= minPriceQuery!
            
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
        cell.itemLabel?.text = item.label
        cell.thumbnailImageView?.image = UIImage(named: restaurantImages[indexPath.row])
        cell.priceLabel?.text = String(format: "%.2f", item.price!)
        cell.userLabel?.text = item.username
        return cell
    }
}
