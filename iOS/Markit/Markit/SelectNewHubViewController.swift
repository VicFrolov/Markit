//
//  SelectNewHubViewController.swift
//  Markit
//
//  Created by Bryan Ku on 12/14/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FirebaseDatabase

class SelectNewHubViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    //var hubs: NSDictionary!
    var hubs = [String]()
    var ref: FIRDatabaseReference!
    @IBOutlet weak var tableview: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        hubs.append("Loyola Marymount University")
        hubs.append("UCLA")
    }
    
    
    private func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return hubs.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "hubCell", for: indexPath) as! HubTableViewCell
        
        let hubName = hubs[indexPath.row]
        cell.hubNameLabel?.text = hubName
        
        return cell
    }
}
