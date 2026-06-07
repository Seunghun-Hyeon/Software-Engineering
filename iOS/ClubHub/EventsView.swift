//
//  EventsView.swift
//  ClubHub
//
//  Created by 현승훈 on 6/7/26.
//


import SwiftUI

struct EventsView: View {
    @State private var eventSearchText = ""
    @State private var selectedFilter = "All"
    
    let filters = ["All", "Today", "This Week", "Coding", "Arts", "Music"]
    
    var body: some View {
        ZStack(alignment: .top) {
            // 웹 테마 배경색 (bg-background: #f8f9fa)
            Color(hex: "f8f9fa")
                .ignoresSafeArea()
            
            ScrollView(showsIndicators: false) {
                VStack(spacing: 28) {
                    // 상단 고정 앱 바(AppBar) 높이 보정용 마진
                    Color.clear.frame(height: 64)
                    
                    // 1. 검색창 및 가로 스크롤 필터 칩 섹션
                    VStack(spacing: 16) {
                        // 검색바
                        HStack {
                            Image(systemName: "magnifyingglass")
                                .foregroundColor(Color(hex: "777587"))
                            TextField("Search events, workshops, or clubs...", text: $eventSearchText)
                                .font(.custom("Inter", size: 16))
                        }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 14)
                        .background(Color.white)
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.03), radius: 15, x: 0, y: 4)
                        
                        // 가로 스크롤 필터 칩 목록
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 12) {
                                ForEach(filters, id: \.self) { filter in
                                    Button(action: {
                                        withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                                            selectedFilter = filter
                                        }
                                    }) {
                                        Text(filter)
                                            .font(.custom("Inter", size: 14))
                                            .fontWeight(.semibold)
                                            .padding(.horizontal, 24)
                                            .padding(.vertical, 10)
                                            .background(
                                                selectedFilter == filter ? Color(hex: "3525cd") : Color.white.opacity(0.7)
                                            )
                                            .foregroundColor(selectedFilter == filter ? .white : Color(hex: "464555"))
                                            .cornerRadius(9999)
                                            .blurEffect(disabled: selectedFilter == filter) // 비활성화 상태만 유리효과
                                            .shadow(color: selectedFilter == filter ? Color(hex: "4f46e5").opacity(0.3) : Color.black.opacity(0.02), radius: 12, x: 0, y: 4)
                                    }
                                }
                            }
                        }
                    }
                    
                    // 2. 대형 대표 추천 이벤트 카드 (Featured Event Card - Aspect 4:5)
                    FeaturedEventCard()
                    
                    // 3. 다가오는 이벤트 리스트 (Upcoming Events)
                    UpcomingEventsList()
                    
                    Color.clear.frame(height: 40) // 하단 네이티브 탭바 대응 마진
                }
                .padding(.horizontal, 20) // px-margin-mobile: 20px
            }
            
            // 4. 고정형 상단 앱 바 (Event 전용 헤더)
            EventsTopHeaderView()
        }
        .toolbar(.hidden, for: .navigationBar) // 커스텀 상단바 사용을 위한 내비게이션 바 숨김
    }
}

// MARK: - [하위 컴포넌트 1] 상단 고정 헤더
struct EventsTopHeaderView: View {
    var body: some View {
        VStack {
            HStack(spacing: 16) {
                // 좌측 유저 프로필 썸네일 구조
                Image(systemName: "person.crop.circle.fill")
                    .resizable()
                    .frame(width: 40, height: 40)
                    .foregroundColor(Color(hex: "4f46e5").opacity(0.2))
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color(hex: "3525cd").opacity(0.2), lineWidth: 2))
                
                Spacer()
                
                Text("Handong ClubHub")
                    .font(.custom("Poppins-Bold", size: 24))
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "3525cd"))
                
                Spacer()
                
                // 우측 알림 버튼
                Button(action: {}) {
                    ZStack {
                        Color(hex: "f3f4f5")
                        Image(systemName: "bell.fill")
                            .font(.system(size: 16))
                            .foregroundColor(Color(hex: "191c1d"))
                    }
                    .frame(width: 40, height: 40)
                    .clipShape(Circle())
                }
            }
            .padding(.horizontal, 20)
            .frame(height: 64)
            .background(Color.white.opacity(0.7).blurEffect())
            .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
            
            Spacer()
        }
    }
}

// MARK: - [하위 컴포넌트 2] 대형 대표 이벤트 카드 (Featured Card)
struct FeaturedEventCard: View {
    var body: some View {
        // aspect-[4/5] 비율 렌더링 구성
        AspectRatioLayout(aspectRatio: 4/5) {
            ZStack(alignment: .bottom) {
                // 배경 그라디언트 및 이미지 플레이스홀더 (vibrant neon indigo & teal 무드 반영)
                LinearGradient(
                    colors: [Color(hex: "3525cd"), Color(hex: "006c49")],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                
                // 하단 가독성을 위한 블랙 그라디언트 오버레이 (from-black/80)
                LinearGradient(
                    colors: [.black.opacity(0.8), .black.opacity(0.2), .clear],
                    startPoint: .bottom,
                    endPoint: .top
                )
                
                // 상단 좌측 FEATURED 배지
                VStack {
                    HStack {
                        Text("FEATURED")
                            .font(.custom("Inter", size: 12))
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 6)
                            .background(Color(hex: "3525cd").opacity(0.9))
                            .cornerRadius(9999)
                        Spacer()
                    }
                    Spacer()
                }
                .padding(24)
                
                // 하단 텍스트 및 아바타 스택 인터랙션 레이어
                VStack(alignment: .leading, spacing: 16) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Handong Developers Night")
                            .font(.custom("Poppins-Bold", size: 32))
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .lineLimit(2)
                            .fixedSize(horizontal: false, vertical: true)
                        
                        HStack(spacing: 16) {
                            HStack(spacing: 6) {
                                Image(systemName: "calendar")
                                    .font(.system(size: 14))
                                Text("Fri, Oct 25")
                                    .font(.custom("Inter", size: 12))
                            }
                            HStack(spacing: 6) {
                                Image(systemName: "mappin.and.ellipse")
                                    .font(.system(size: 14))
                                Text("Tech Hall 101")
                                    .font(.custom("Inter", size: 12))
                            }
                        }
                        .foregroundColor(.white.opacity(0.8))
                    }
                    
                    // 참석자 아바타 스택 및 Explore 버튼 규칙 구현
                    HStack {
                        // 겹쳐진 아바타 원형들 (-space-x-3 효과)
                        HStack(spacing: -12) {
                            ForEach(0..<3) { i in
                                Image(systemName: "person.crop.circle.fill")
                                    .resizable()
                                    .frame(width: 32, height: 32)
                                    .foregroundColor(.white.opacity(0.4 + Double(i)*0.2))
                                    .background(Color.black.opacity(0.2))
                                    .clipShape(Circle())
                                    .overlay(Circle().stroke(Color.black.opacity(0.2), lineWidth: 2))
                            }
                            Text("+42")
                                .font(.custom("Inter", size: 10))
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                                .frame(width: 32, height: 32)
                                .background(Color.white.opacity(0.2))
                                .clipShape(Circle())
                                .overlay(Circle().stroke(Color.black.opacity(0.2), lineWidth: 2))
                        }
                        
                        Spacer()
                        
                        // Explore 우측 고정 버튼
                        Button(action: {}) {
                            Text("Explore")
                                .font(.custom("Inter", size: 14))
                                .fontWeight(.semibold)
                                .foregroundColor(Color(hex: "3525cd"))
                                .padding(.horizontal, 32)
                                .padding(.vertical, 12)
                                .background(Color.white)
                                .cornerRadius(9999)
                        }
                    }
                    .padding(.top, 8)
                }
                .padding(32)
            }
        }
        .cornerRadius(32) // rounded-[2rem]
        .shadow(color: Color.black.opacity(0.15), radius: 25, x: 0, y: 10)
    }
}

// MARK: - [하위 컴포넌트 3] 다가오는 이벤트 세로 목록
struct UpcomingEventsList: View {
    @State private var rsvpStates: [String: Bool] = [
        "Media Workshop: Podcast 101": true, // Going 상태 초기화
        "Acoustic Night: Live in Campus": false,
        "Abstract Canvas Workshop": false
    ]
    
    var body: some View {
        VStack(spacing: 16) {
            // 타이틀 헤더 라인
            HStack(alignment: .bottom) {
                Text("Upcoming Events")
                    .font(.custom("Poppins-SemiBold", size: 24))
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "191c1d"))
                Spacer()
                Button("See All") {}
                    .font(.custom("Inter", size: 14))
                    .fontWeight(.semibold)
                    .foregroundColor(Color(hex: "3525cd"))
            }
            .padding(.horizontal, 4)
            
            // 이벤트 카드 목록 바인딩 생성 루프
            VStack(spacing: 16) {
                EventRowItem(month: "OCT", day: "24", title: "Media Workshop: Podcast 101", club: "Media Society", time: "4:00 PM", location: "Studio B", icon: "mic.fill", iconBg: "e7e8e9", iconColor: "464555", isGoing: Binding(get: { rsvpStates["Media Workshop: Podcast 101"] ?? false }, set: { rsvpStates["Media Workshop: Podcast 101"] = $0 }))
                
                EventRowItem(month: "OCT", day: "27", title: "Acoustic Night: Live in Campus", club: "Music & Arts Hub", time: "7:30 PM", location: "Main Plaza", icon: "guitar.fill", iconBg: "e1e0ff", iconColor: "3130c0", isGoing: Binding(get: { rsvpStates["Acoustic Night: Live in Campus"] ?? false }, set: { rsvpStates["Acoustic Night: Live in Campus"] = $0 }))
                
                EventRowItem(month: "OCT", day: "30", title: "Abstract Canvas Workshop", club: "Fine Arts Guild", time: "2:00 PM", location: "Art Annex", icon: "paintpalette.fill", iconBg: "6ffbbe", iconColor: "006c49", isGoing: Binding(get: { rsvpStates["Abstract Canvas Workshop"] ?? false }, set: { rsvpStates["Abstract Canvas Workshop"] = $0 }))
            }
        }
    }
}

// MARK: - [하위 컴포넌트 4] 공용 우측 리스트 카드 셀 (Glass-Card 구현)
struct EventRowItem: View {
    let month: String
    let day: String
    let title: String
    let club: String
    let time: String
    let location: String
    
    let icon: String
    let iconBg: String
    let iconColor: String
    
    @Binding var isGoing: Bool
    
    var body: some View {
        HStack(spacing: 16) {
            // 좌측 유색 이미지 썸네일 박스 + 달력 오버레이 조합
            ZStack(alignment: .topLeading) {
                ZStack {
                    Color(hex: iconBg)
                    Image(systemName: icon)
                        .font(.title2)
                        .foregroundColor(Color(hex: iconColor))
                }
                .frame(width: 96, height: 96)
                .cornerRadius(16)
                
                // 달력 날짜 배지 조합 규칙
                VStack(spacing: 2) {
                    Text(month)
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(Color(hex: "3525cd"))
                    Text(day)
                        .font(.custom("Inter", size: 14))
                        .fontWeight(.bold)
                        .foregroundColor(Color(hex: "191c1d"))
                }
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.white.opacity(0.9))
                .cornerRadius(8)
                .offset(x: 4, y: 4)
            }
            
            // 중앙 우측 데이터 표기 영역
            VStack(alignment: .leading, spacing: 4) {
                VStack(alignment: .leading, spacing: 1) {
                    Text(title)
                        .font(.custom("Inter", size: 14))
                        .fontWeight(.semibold)
                        .foregroundColor(Color(hex: "191c1d"))
                        .lineLimit(1)
                    
                    Text(club)
                        .font(.custom("Inter", size: 12))
                        .foregroundColor(Color(hex: "464555"))
                }
                
                // 시간 장소 서브 메타 정보 행
                HStack(spacing: 12) {
                    HStack(spacing: 4) {
                        Image(systemName: "clock")
                        Text(time)
                    }
                    HStack(spacing: 4) {
                        Image(systemName: "mappin.and.ellipse")
                        Text(location)
                    }
                }
                .font(.system(size: 12))
                .foregroundColor(Color(hex: "777587"))
                
                // 하단 RSVP / Going 토글 인터랙션 버튼
                HStack {
                    Spacer()
                    Button(action: {
                        withAnimation(.easeInOut(duration: 0.2)) {
                            isGoing.toggle()
                        }
                    }) {
                        if isGoing {
                            Text("Going")
                                .font(.custom("Inter", size: 12))
                                .fontWeight(.semibold)
                                .foregroundColor(Color(hex: "00714d"))
                                .padding(.horizontal, 20)
                                .padding(.vertical, 6)
                                .background(Color(hex: "6cf8bb"))
                                .cornerRadius(9999)
                        } else {
                            Text("RSVP")
                                .font(.custom("Inter", size: 12))
                                .fontWeight(.semibold)
                                .foregroundColor(Color(hex: "3525cd"))
                                .padding(.horizontal, 20)
                                .padding(.vertical, 6)
                                .background(Color.clear)
                                .cornerRadius(9999)
                                .overlay(RoundedRectangle(cornerRadius: 9999).stroke(Color(hex: "3525cd").opacity(0.2), lineWidth: 1))
                        }
                    }
                }
            }
            .padding(.vertical, 4)
        }
        .padding(16)
        .background(Color.white.opacity(0.7).blurEffect())
        .cornerRadius(24)
        .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
    }
}

// MARK: - [보조 유틸리티] 비율 레이아웃 프레임 구조체
struct AspectRatioLayout<Content: View>: View {
    let aspectRatio: CGFloat
    let content: () -> Content
    
    var body: some View {
        GeometryReader { geometry in
            content()
                .frame(width: geometry.size.width, height: geometry.size.width / aspectRatio)
        }
        .aspectRatio(aspectRatio, contentMode: .fit)
    }
}

// MARK: - [보조 유틸리티 2] 활성화 필터 구분을 위한 블러 끄기 전용 모디파이어 확장
extension View {
    func blurEffect(disabled: Bool) -> some View {
        Group {
            if disabled {
                self
            } else {
                self.blurEffect()
            }
        }
    }
}