//
//  HubViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/11/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth
import FirebaseStorage

class HubViewController: UIViewController {
    @IBOutlet weak var greetingMessageLabel: UILabel!
    @IBOutlet weak var greetingNameLabel: UILabel!
    @IBOutlet weak var listingsContainerView: UIView!
    @IBOutlet weak var pageControl: UIPageControl!
    var ref: FIRDatabaseReference!

    override func viewDidLoad() {
        super.viewDidLoad()
        makeNavBarInvis()
        self.pageControl.currentPageIndicatorTintColor = UIColor.red
        self.pageControl.pageIndicatorTintColor = UIColor.black
        definesPresentationContext = true
    }
    
    override func viewDidAppear(_ animated: Bool) {
        ref = FIRDatabase.database().reference()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func makeNavBarInvis() {
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.isTranslucent = true
        self.navigationController?.view.backgroundColor = UIColor.clear
        self.navigationController?.navigationBar.tintColor = UIColor.black
        navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
    }

}
extension HubViewController: HubListingsPageViewControllerDelegate {
    
    internal func hubListingsPageViewController(hubListingsPageViewController: HubListingsPageViewController,
                                                didUpdatePageCount count: Int) {
        pageControl.numberOfPages = count
    }
    
    internal func hubsListingsPageViewController(hubListingsPageViewController: HubListingsPageViewController,
                                                 didUpdatePageIndex index: Int) {
        pageControl.currentPage = index
    }
    
}
