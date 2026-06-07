//
//  CustomTabBar.swift
//  ClubHub
//
//  Created by 현승훈 on 6/7/26.
//
import SwiftUI

struct CustomTabBar: View {
    @Binding var selectedTab: Int
    
    let items = [
        ("safari", "Discover"),
        ("person.3", "Clubs"),
        ("calendar", "Events"),
        ("person", "Profile")
    ]
    
    var body: some View {
        VStack(spacing: 0) {
            Spacer()
            HStack(alignment: .center) {
                ForEach(0..<items.count, id: \.self) { index in
                    Spacer()
                    Button(action: { selectedTab = index }) {
                        VStack(spacing: 4) {
                            Image(systemName: items[index].0)
                                .font(.title3)
                            Text(items[index].1)
                                .font(.system(size: 12, weight: .medium))
                        }
                        .padding(.vertical, 8)
                        .padding(.horizontal, 16)
                        // 활성화 탭 하이라이트 스타일 (웹 소스 기준 구현)
                        .background(selectedTab == index ? Color(hex: "e2dfff") : Color.clear)
                        .foregroundColor(selectedTab == index ? Color(hex: "3525cd") : Color(hex: "464555"))
                        .cornerRadius(20)
                    }
                    Spacer()
                }
            }
            .frame(height: 80)
            .background(Color.white.opacity(0.7).blurEffect())
            .cornerRadius(16, corners: [.topLeft, .topRight])
            .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: -5)
        }
    }
}
