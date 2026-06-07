//
//  HomeView.swift
//  ClubHub
//
//  Created by 현승훈 on 6/7/26.
//


import SwiftUI

struct HomeView: View {
    @Binding var searchText: String
    @Binding var isShowingDetail: Bool // ContentView와 바인딩 연동
    
    var body: some View {
        ZStack(alignment: .bottom) {
            Color(hex: "f8f9fa")
                .ignoresSafeArea()
            
            ScrollView(showsIndicators: false) {
                VStack(spacing: 40) {
                    Color.clear.frame(height: 20) // 상단 바 영역 고려 마진
                    
                    HeroSection(searchText: $searchText)
                    InterestCategoriesSection()
                    EventsSection()
                    
                    // 🌟 추천 동아리 섹션을 터치하면 ContentView의 모달이 열리도록 연동
                    Button(action: {
                        isShowingDetail = true
                    }) {
                        RecommendedClubsSection()
                    }
                    .buttonStyle(PlainButtonStyle())
                    
                    Color.clear.frame(height: 40)
                }
                .padding(.horizontal, 20)
            }
            
            TopHeaderView()
            FloatingActionButton()
        }
    }
}