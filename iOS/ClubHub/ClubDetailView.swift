import SwiftUI

struct ClubDetailView: View {
    @State private var selectedSubTab = 0
    @State private var isJoinedRequested = false
    @State private var isJoining = false
    
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        ZStack(alignment: .top) {
            // 웹 테마 배경색 (bg-background: #f8f9fa)
            Color(hex: "f8f9fa")
                .ignoresSafeArea()
            
            ScrollView(showsIndicators: false) {
                VStack(spacing: 0) {
                    // 1. 배너 이미지 + 로고 + 타이틀이 포함된 고도화 히어로 섹션
                    ClubDetailHeroSection(isJoinedRequested: $isJoinedRequested, isJoining: $isJoining)
                    
                    // 2. 가로 스크롤 대응 서브 탭 메뉴 (About / Gallery / Members / Events)
                    SubTabSection(selectedSubTab: $selectedSubTab)
                    
                    // 3. 컨텐츠 영역 (Bento Grid 매칭)
                    if selectedSubTab == 0 {
                        VStack(spacing: 20) { // spacing: bento-gap (20px)
                            MissionStatementCard()
                            TechStackCard()
                            StatsBentoGrid()
                            FeaturedProjectCard()
                            LatestEventCard()
                            
                            // 하단 시스템 탭 바 영역 확보용 여백
                            Color.clear.frame(height: 100)
                        }
                        .padding(.horizontal, 20) // margin-mobile (20px)
                        .padding(.top, 24)        // gutter (24px)
                    } else {
                        VStack {
                            Spacer()
                            Text("콘텐츠 준비 중입니다.")
                                .font(.custom("Inter", size: 14))
                                .foregroundColor(Color(hex: "464555"))
                                .padding(.top, 40)
                            Spacer()
                        }
                    }
                }
            }
            .edgesIgnoringSafeArea(.top)
            
            // 4. Glassmorphism 상단 백 버튼 헤더 (웹 디자인과 일치)
            ClubDetailTopHeaderView(dismissAction: { dismiss() })
        }
        .navigationBarHidden(true)
    }
}

// MARK: - 1. 상단 백 버튼 헤더 (Glassmorphism 적용)
struct ClubDetailTopHeaderView: View {
    var dismissAction: () -> Void
    
    var body: some View {
        VStack {
            HStack {
                Button(action: dismissAction) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(Color(hex: "464555"))
                        .frame(width: 40, height: 40)
                        .background(Color.white.opacity(0.7).blurEffect()) // glass-card 효과
                        .clipShape(Circle())
                        .overlay(Circle().stroke(Color.white.opacity(0.3), lineWidth: 1))
                }
                Spacer()
            }
            .padding(.horizontal, 20)
            .frame(height: 64)
            
            Spacer()
        }
    }
}

// MARK: - 2. 고도화된 히어로 섹션
struct ClubDetailHeroSection: View {
    @Binding var isJoinedRequested: Bool
    @Binding var isJoining: Bool
    
    var body: some View {
        VStack(spacing: 0) {
            // 상단 대형 배너 (h-80 매칭)
            ZStack(alignment: .bottom) {
                // 임시 그라데이션 배너 배경 (실제 연동 시 Image 컴포넌트로 변경 가능)
                LinearGradient(
                    colors: [Color(hex: "3525cd").opacity(0.3), Color(hex: "f8f9fa")],
                    startPoint: .top,
                    endPoint: .bottom
                )
                .frame(height: 240)
                
                // 로고와 타이틀 영역 (위로 살짝 오버랩되도록 패딩 조정)
                HStack(alignment: .bottom, spacing: 16) {
                    // 클럽 로고 박스 (rounded-3xl glass-card)
                    ZStack {
                        Color.white.opacity(0.7).blurEffect()
                        Image(systemName: "terminal") // 추후 로고 이미지로 대체 가능
                            .font(.system(size: 36, weight: .bold))
                            .foregroundColor(Color(hex: "3525cd"))
                    }
                    .frame(width: 96, height: 96) // w-24, h-24
                    .cornerRadius(24) // rounded-3xl
                    .shadow(color: Color.black.opacity(0.1), radius: 10, x: 0, y: 5)
                    .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
                    
                    // 타이틀 및 멤버 수 정보
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Developers Society")
                            .font(.custom("Poppins-Bold", size: 24))
                            .fontWeight(.bold)
                            .foregroundColor(Color(hex: "191c1d"))
                        
                        HStack(spacing: 8) {
                            // Active Now 실시간 펄스 효과 뱃지
                            HStack(spacing: 4) {
                                Circle()
                                    .frame(width: 6, height: 6)
                                    .foregroundColor(Color(hex: "006c49"))
                                Text("Active Now")
                                    .font(.custom("Inter", size: 12))
                                    .fontWeight(.medium)
                                    .foregroundColor(Color(hex: "00714d"))
                            }
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color(hex: "6cf8bb")) // secondary-container
                            .cornerRadius(9999)
                            
                            Text("420 Members")
                                .font(.custom("Inter", size: 14))
                                .fontWeight(.semibold)
                                .foregroundColor(Color(hex: "464555"))
                        }
                    }
                    Spacer()
                }
                .padding(.horizontal, 20)
                .offset(y: 10)
            }
            
            // 지원 버튼 가로 가득 채우기 (Join Society)
            Button(action: {
                withAnimation(.spring()) {
                    isJoinedRequested.toggle()
                }
            }) {
                HStack(spacing: 8) {
                    Text(isJoinedRequested ? "Cancel Request" : "Join Society")
                    Image(systemName: isJoinedRequested ? "xmark.circle" : "plus.circle")
                }
                .font(.custom("Inter", size: 14))
                .fontWeight(.bold)
                .foregroundColor(isJoinedRequested ? Color(hex: "93000a") : .white)
                .frame(maxWidth: .infinity)
                .frame(height: 52)
                .background(isJoinedRequested ? Color(hex: "ffdad6") : Color(hex: "4f46e5")) // primary-container
                .cornerRadius(9999)
            }
            .padding(.horizontal, 20)
            .padding(.top, 24)
        }
    }
}

// MARK: - 3. 서브 탭 섹션 (스티키 세그먼트 디자인)
struct SubTabSection: View {
    @Binding var selectedSubTab: Int
    let tabs = ["About", "Gallery", "Members", "Events"]
    
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 32) {
                ForEach(0..<tabs.count, id: \.self) { index in
                    Button(action: { selectedSubTab = index }) {
                        VStack(spacing: 8) {
                            Text(tabs[index])
                                .font(.custom("Inter", size: 14))
                                .fontWeight(.semibold)
                                .foregroundColor(selectedSubTab == index ? Color(hex: "3525cd") : Color(hex: "464555"))
                            
                            // 인디케이터 라인
                            Rectangle()
                                .fill(selectedSubTab == index ? Color(hex: "3525cd") : Color.clear)
                                .frame(height: 2)
                                .cornerRadius(9999)
                        }
                    }
                }
            }
            .padding(.horizontal, 20)
            .padding(.top, 20)
        }
        .background(Color(hex: "f8f9fa"))
    }
}

// MARK: - 4. 미션 선언문 카드
struct MissionStatementCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Mission Statement")
                .font(.custom("Poppins-SemiBold", size: 20))
                .fontWeight(.bold)
                .foregroundColor(Color(hex: "191c1d"))
            
            Text("Empowering the next generation of software architects through collaborative projects, technical workshops, and industry networking. We build tools that matter for the Handong community.")
                .font(.custom("Inter", size: 16))
                .foregroundColor(Color(hex: "464555"))
                .lineSpacing(6)
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.white.opacity(0.7).blurEffect()) // glass-card
        .cornerRadius(24) // rounded-[24px]
        .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
    }
}

// MARK: - 5. 핵심 기술 스택 카드
struct TechStackCard: View {
    let stacks = ["React Native", "Go", "PostgreSQL", "Rust", "TypeScript", "AWS"]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("CORE TECH STACK")
                .font(.custom("Inter", size: 14))
                .fontWeight(.bold)
                .foregroundColor(Color(hex: "3525cd")) // primary 컬러 트랙킹
                .tracking(1.5)
            
            // 유동적 가로 줄바꿈 플로우 레이아웃 디자인 형태 처리
            FlowLayout(spacing: 8, items: stacks) { tech in
                Text(tech)
                    .font(.custom("Inter", size: 12))
                    .fontWeight(.medium)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color(hex: "edeeef")) // surface-container
                    .foregroundColor(Color(hex: "191c1d"))
                    .cornerRadius(9999)
            }
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.white.opacity(0.7).blurEffect())
        .cornerRadius(24)
        .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
    }
}

// MARK: - 6. 활성 통계 벤토 그리드
struct StatsBentoGrid: View {
    var body: some View {
        HStack(spacing: 20) { // bento-gap (20px)
            // 왼쪽 벤토 박스 (Live Projects)
            VStack(alignment: .leading, spacing: 0) {
                Image(systemName: "terminal")
                    .font(.system(size: 32))
                    .foregroundColor(Color(hex: "3525cd"))
                Spacer()
                Text("15+")
                    .font(.custom("Poppins-Bold", size: 36))
                    .foregroundColor(Color(hex: "191c1d"))
                Text("Live Projects")
                    .font(.custom("Inter", size: 14))
                    .foregroundColor(Color(hex: "464555"))
            }
            .padding(24)
            .frame(maxWidth: .infinity, minHeight: 160, alignment: .leading)
            .background(Color.white.opacity(0.7).blurEffect())
            .cornerRadius(24)
            .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
            
            // 오른쪽 벤토 박스 (Awards Won)
            VStack(alignment: .leading, spacing: 0) {
                Image(systemName: "trophy")
                    .font(.system(size: 32))
                    .foregroundColor(Color(hex: "006c49")) // secondary 컬러 매칭
                Spacer()
                Text("3")
                    .font(.custom("Poppins-Bold", size: 36))
                    .foregroundColor(Color(hex: "191c1d"))
                Text("Awards Won")
                    .font(.custom("Inter", size: 14))
                    .foregroundColor(Color(hex: "464555"))
            }
            .padding(24)
            .frame(maxWidth: .infinity, minHeight: 160, alignment: .leading)
            .background(Color.white.opacity(0.7).blurEffect())
            .cornerRadius(24)
            .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
        }
    }
}

// MARK: - 7. 대표 프로젝트 시네마틱 카드
struct FeaturedProjectCard: View {
    var body: some View {
        ZStack(alignment: .bottomLeading) {
            // 프로젝트 이미지 레이어 대용 임시 면분할 그라데이션 코딩 스크린 매칭
            LinearGradient(
                colors: [Color.black.opacity(0.2), Color.black.opacity(0.85)],
                startPoint: .top,
                endPoint: .bottom
            )
            .frame(height: 224) // h-56 (224px)
            
            VStack(alignment: .leading, spacing: 4) {
                Text("Featured Project")
                    .font(.custom("Inter", size: 12))
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "dad7ff")) // on-primary-container
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color(hex: "4f46e5").opacity(0.9)) // primary-container
                    .cornerRadius(4)
                
                Text("Campus Navigator App")
                    .font(.custom("Poppins-Bold", size: 24))
                    .foregroundColor(.white)
                
                Text("Real-time room occupancy & booking system.")
                    .font(.custom("Inter", size: 14))
                    .foregroundColor(.white.opacity(0.8))
            }
            .padding(24)
        }
        .frame(maxWidth: .infinity)
        .cornerRadius(24)
        .shadow(color: Color.black.opacity(0.1), radius: 10, x: 0, y: 5)
    }
}

// MARK: - 8. 최신 이벤트 정보 슬롯 목록형 카드
struct LatestEventCard: View {
    var body: some View {
        HStack(spacing: 16) {
            // 달력 날짜 박스 아이콘 데이터 연동부 타겟팅 (OCT 24)
            VStack(spacing: 2) {
                Text("OCT")
                    .font(.custom("Inter", size: 14))
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "2f2ebe"))
                Text("24")
                    .font(.custom("Poppins-Bold", size: 24))
                    .foregroundColor(Color(hex: "2f2ebe"))
            }
            .frame(width: 64, height: 64)
            .background(Color(hex: "e1e0ff")) // tertiary-fixed 세팅 컬러 매칭
            .cornerRadius(16)
            
            // 텍스트 메타 정보
            VStack(alignment: .leading, spacing: 4) {
                Text("Algorithm Sprint '24")
                    .font(.custom("Inter", size: 16))
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "191c1d"))
                
                HStack(spacing: 4) {
                    Image(systemName: "mappin.and.ellipse")
                        .font(.system(size: 14))
                    Text("Newton Hall 301")
                }
                .font(.custom("Inter", size: 12))
                .foregroundColor(Color(hex: "464555"))
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(Color(hex: "464555"))
        }
        .padding(24)
        .frame(maxWidth: .infinity)
        .background(Color.white.opacity(0.7).blurEffect())
        .cornerRadius(24)
        .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
    }
}

// MARK: - 헬퍼 라이브러리 (기술 스택 레이아웃 자동 줄바꿈 관리용 뷰 스택)
// MARK: - 헬퍼 라이브러리 (기술 스택 레이아웃 자동 줄바꿈 관리용 뷰 스택) - 수정 완료
struct FlowLayout<T: Hashable, V: View>: View {
    var spacing: CGFloat
    var items: [T]
    var content: (T) -> V
    
    @State private var totalHeight = CGFloat.zero
    
    var body: some View {
        VStack {
            GeometryReader { geometry in
                self.generateContent(in: geometry)
            }
        }
        .frame(height: totalHeight)
    }
    
    private func generateContent(in geometry: GeometryProxy) -> some View {
        var width = CGFloat.zero
        var height = CGFloat.zero
        
        return ZStack(alignment: .topLeading) {
            ForEach(self.items, id: \.self) { item in
                self.content(item)
                    .padding([.horizontal, .vertical], spacing / 2)
                    // ✨ Incorrect argument label 수정 포인트 1: computeValue 구조로 변경
                    .alignmentGuide(.leading, computeValue: { d in
                        if (abs(width - d.width) > geometry.size.width) {
                            width = 0
                            height -= d.height
                        }
                        let result = width
                        if item == self.items.last! {
                            width = 0 // 마지막 아이템 시 초기화
                        } else {
                            width -= d.width
                        }
                        return result
                    })
                    // ✨ Incorrect argument label 수정 포인트 2: computeValue 구조로 변경
                    .alignmentGuide(.top, computeValue: { d in
                        let result = height
                        if item == self.items.last! {
                            height = 0
                        }
                        return result
                    })
            }
        }
        .background(viewHeightReader($totalHeight))
    }
    
    private func viewHeightReader(_ binding: Binding<CGFloat>) -> some View {
        return GeometryReader { geometry -> Color in
            let rect = geometry.frame(in: .local)
            DispatchQueue.main.async {
                binding.wrappedValue = rect.size.height
            }
            return .clear
        }
    }
}
