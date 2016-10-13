//
//  ProfilePageViewController.swift
//  Markit
//
//  Created by Bryan Ku on 10/13/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class ProfilePageViewController: UIPageViewController {
    
    private(set) lazy var orderedViewControllers: [UIViewController] = {
        return [self.newViewController(title: "ProfilePage"),
                self.newViewController(title: "WatchListPage"),
                self.newViewController(title: "TagPage")]
    }()
    
    private func newViewController(title: String) -> UIViewController {
        return UIStoryboard(name: "Main", bundle: nil) .
            instantiateViewController(withIdentifier: "\(title)ViewController")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        var dataSource = self
        
        if let firstViewController = orderedViewControllers.first {
            setViewControllers([firstViewController],
                               direction: .forward,
                               animated: true,
                               completion: nil)
        }
    }
    
    
    
}

extension ProfilePageViewController: UIPageViewControllerDataSource {
    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerBefore viewController: UIViewController) ->UIViewController? {
        return nil
        }
    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerAfter viewController: UIViewController) -> UIViewController? {
        return nil
        }
        
}
