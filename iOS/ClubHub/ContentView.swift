import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0
    @State private var searchText = ""
    @State private var isShowingDetail = false // 홈 화면 전용 상세 모달 제어용
    
    var body: some View {
        TabView(selection: $selectedTab) {
            
            // 1번 탭: Discover (독립된 HomeView 연동)
            NavigationStack {
                HomeView(searchText: $searchText, isShowingDetail: $isShowingDetail)
            }
            .tabItem {
                Image(systemName: "safari")
                Text("Discover")
            }
            .tag(0)
            
            // 2번 탭: Clubs (독립된 ClubDetailView 탭 이동 구조)
            NavigationStack {
                ClubDetailView()
            }
            .tabItem {
                Image(systemName: "person.3")
                Text("Clubs")
            }
            .tag(1)
            
            // 3번 탭: Events (🌟 방금 제작한 신규 Glassmorphic EventsView 완벽 결합!)
            NavigationStack {
                EventsView()
            }
            .tabItem {
                Image(systemName: selectedTab == 2 ? "calendar.badge.clock" : "calendar")
                Text("Events")
            }
            .tag(2)
            
            // 4번 탭: Profile (독립된 ProfileView 연동)
            NavigationStack {
                ProfileView()
            }
            .tabItem {
                Image(systemName: selectedTab == 3 ? "person.fill" : "person")
                Text("Profile")
            }
            .tag(3)
        }
        .tint(Color(hex: "3525cd")) // 글로벌 포인트 테마 색상 상속
        
        // 1번 홈 화면 카드 인터랙션 전용 모달 시트 분기 유지
        .fullScreenCover(isPresented: $isShowingDetail) {
            ClubDetailView()
        }
    }
}

#Preview {
    ContentView()
}
