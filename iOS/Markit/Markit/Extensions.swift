//
//  Extensions.swift
//  Markit
//
//  Created by Trixie on 12/13/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import Foundation

extension Date {
    
    func parse (dateString: String, format: String = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzz)") -> Date {
        let formatter = DateFormatter()
        formatter.dateFormat = format
        formatter.timeZone = NSTimeZone(name: "UTC") as TimeZone!
        return formatter.date(from: dateString)!
    }
    
    func toString(format: String = "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzz)") -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = format
        return formatter.string(from: self)
    }
    
    func getJustDate() {
        
    }
    
    func getJustTime() {
        
    }
    
}

extension String {
    
    func trim() -> String {
        return self.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}
