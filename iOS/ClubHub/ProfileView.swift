//
//  ProfileView.swift
//  ClubHub
//
//  Created by 현승훈 on 6/7/26.
//


import SwiftUI

struct ProfileView: View {
    var body: some View {
        ZStack(alignment: .top) {
            // 웹 테마 배경색 (bg-background: #f8f9fa)
            Color(hex: "f8f9fa")
                .ignoresSafeArea()
            
            ScrollView(showsIndicators: false) {
                VStack(spacing: 24) {
                    // 상단 고정 헤더 영역 확보용 여백
                    Color.clear.frame(height: 64)
                    
                    // 1. 프로필 헤더 섹션 (Glassmorphic Card)
                    ProfileHeaderSection()
                    
                    // 2. 임팩트 통계 벤토 그리드 섹션
                    ImpactStatsBentoGrid()
                    
                    // 3. 최근 활동 히스토리 섹션
                    RecentActivitySection()
                    
                    // 4. 계정 설정 섹션
                    AccountSettingsSection()
                    
                    // 5. 로그아웃 버튼
                    LogOutButton()
                    
                    // 하단 시스템 탭 바 영역 확보용 여백
                    Color.clear.frame(height: 100)
                }
                .padding(.horizontal, 20) // margin-mobile (20px)
            }
            
            // 6. 상단 고정 앱 바
            ProfileTopHeaderView()
        }
        .navigationBarHidden(true)
    }
}

// MARK: - 1. 상단 고정 앱 바 (Top AppBar)
struct ProfileTopHeaderView: View {
    var body: some View {
        VStack {
            HStack(spacing: 16) {
                Button(action: {}) {
                    Image(systemName: "square.grid.2x2") // grid_view 매칭
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(Color(hex: "3525cd")) // primary
                }
                
                Text("Handong ClubHub")
                    .font(.custom("Poppins-Bold", size: 24))
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "3525cd"))
                
                Spacer()
                
                // 유저 프로필 미니 박스
                Image(systemName: "person.crop.circle.fill") // 실제 연동 시 AsyncImage 등 매칭 가능
                    .resizable()
                    .frame(width: 40, height: 40)
                    .foregroundColor(Color(hex: "4f46e5"))
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color(hex: "4f46e5"), lineWidth: 2))
            }
            .padding(.horizontal, 20)
            .frame(height: 64)
            .background(Color.white.opacity(0.7).blurEffect()) // glassmorphism
            .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
            
            Spacer()
        }
    }
}

// MARK: - 2. 프로필 헤더 섹션
struct ProfileHeaderSection: View {
    var body: some View {
        ZStack(alignment: .topTrailing) {
            // Glassmorphic Card 배경
            Color.white.opacity(0.7).blurEffect()
            
            // 우측 상단 그래디언트 원형 장식 효과
            Circle()
                .fill(Color(hex: "3525cd").opacity(0.1))
                .frame(width: 128, height: 128)
                .blur(radius: 30)
                .offset(x: 40, y: -40)
            
            VStack(spacing: 0) {
                // 프로필 대형 이미지 박스
                Image(systemName: "person.crop.circle.fill") // 추후 실제 이미지 연동 가능
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 96, height: 96)
                    .clipShape(Circle())
                    .shadow(color: Color.black.opacity(0.1), radius: 10, x: 0, y: 5)
                    .overlay(Circle().stroke(Color.white, lineWidth: 4))
                    .padding(.top, 24)
                
                Text("Alex Kim")
                    .font(.custom("Poppins-SemiBold", size: 24))
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "191c1d")) // on-surface
                    .padding(.top, 16)
                
                Text("Computer Science '24")
                    .font(.custom("Inter", size: 14))
                    .fontWeight(.semibold)
                    .foregroundColor(Color(hex: "777587")) // outline
                    .padding(.top, 4)
                    .padding(.bottom, 24)
                
                // Edit Profile 버튼
                Button(action: {}) {
                    Text("Edit Profile")
                        .font(.custom("Inter", size: 14))
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 48)
                        .background(Color(hex: "4f46e5")) // primary-container
                        .cornerRadius(9999)
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 24)
            }
        }
        .cornerRadius(24)
        .shadow(color: Color.black.opacity(0.05), radius: 15, x: 0, y: 5)
        .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
    }
}

// MARK: - 3. 임팩트 통계 벤토 그리드 섹션
struct ImpactStatsBentoGrid: View {
    var body: some View {
        VStack(spacing: 16) {
            // 상단 2열 벤토 박스
            HStack(spacing: 16) {
                // Clubs Joined
                VStack(alignment: .leading, spacing: 0) {
                    Image(systemName: "person.3.fill") // groups
                        .font(.system(size: 28))
                        .foregroundColor(Color(hex: "3525cd")) // primary
                        .padding(.bottom, 24)
                    
                    Text("3")
                        .font(.custom("Poppins-Bold", size: 36))
                        .foregroundColor(Color(hex: "191c1d"))
                    
                    Text("Clubs Joined")
                        .font(.custom("Inter", size: 12))
                        .fontWeight(.medium)
                        .foregroundColor(Color(hex: "777587"))
                }
                .padding(20)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.white.opacity(0.7).blurEffect())
                .cornerRadius(24)
                .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
                
                // Events Attended
                VStack(alignment: .leading, spacing: 0) {
                    Image(systemName: "calendar") // event
                        .font(.system(size: 28))
                        .foregroundColor(Color(hex: "006c49")) // secondary
                        .padding(.bottom, 24)
                    
                    Text("12")
                        .font(.custom("Poppins-Bold", size: 36))
                        .foregroundColor(Color(hex: "191c1d"))
                    
                    Text("Events Attended")
                        .font(.custom("Inter", size: 12))
                        .fontWeight(.medium)
                        .foregroundColor(Color(hex: "777587"))
                }
                .padding(20)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.white.opacity(0.7).blurEffect())
                .cornerRadius(24)
                .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
            }
            
            // 하단 가로 통합 벤토 박스 (Achievement Points)
            HStack {
                HStack(spacing: 16) {
                    ZStack {
                        Color(hex: "4f46e5") // primary-container
                        Image(systemName: "award.fill") // military_tech
                            .font(.system(size: 24))
                            .foregroundColor(.white)
                    }
                    .frame(width: 48, height: 48)
                    .cornerRadius(16)
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("450")
                            .font(.custom("Poppins-SemiBold", size: 24))
                            .fontWeight(.bold)
                            .foregroundColor(Color(hex: "191c1d"))
                        
                        Text("Achievement Points")
                            .font(.custom("Inter", size: 12))
                            .fontWeight(.medium)
                            .foregroundColor(Color(hex: "777587"))
                    }
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(Color(hex: "c7c4d8")) // outline-variant
            }
            .padding(20)
            .frame(maxWidth: .infinity)
            .background(
                LinearGradient(
                    colors: [Color(hex: "4f46e5").opacity(0.1), Color.white.opacity(0.7)],
                    startPoint: .leading,
                    endPoint: .trailing
                )
                .blurEffect()
            )
            .cornerRadius(24)
            .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
        }
    }
}

// MARK: - 4. 최근 활동 히스토리 섹션
struct RecentActivitySection: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Recent Activity")
                .font(.custom("Poppins-SemiBold", size: 24))
                .fontWeight(.bold)
                .foregroundColor(Color(hex: "191c1d"))
                .padding(.horizontal, 8)
            
            VStack(spacing: 12) {
                // 활동 1
                HStack(spacing: 16) {
                    ZStack {
                        Color(hex: "6cf8bb").opacity(0.2) // secondary-container/20
                        Image(systemName: "paperplane.fill") // send
                            .font(.system(size: 16))
                            .foregroundColor(Color(hex: "006c49")) // secondary
                    }
                    .frame(width: 40, height: 40)
                    .clipShape(Circle())
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Applied to Coding Knights")
                            .font(.custom("Inter", size: 16))
                            .foregroundColor(Color(hex: "191c1d"))
                        Text("2 days ago")
                            .font(.custom("Inter", size: 12))
                            .foregroundColor(Color(hex: "777587"))
                    }
                    Spacer()
                }
                .padding(16)
                .background(Color.white.opacity(0.7).blurEffect())
                .cornerRadius(20)
                .overlay(RoundedRectangle(cornerRadius: 20).stroke(Color.white.opacity(0.3), lineWidth: 1))
                
                // 활동 2
                HStack(spacing: 16) {
                    ZStack {
                        Color(hex: "4b4dd8").opacity(0.1) // tertiary-container/10
                        Image(systemName: "checkmark.seal.fill") // verified
                            .font(.system(size: 16))
                            .foregroundColor(Color(hex: "3130c0")) // tertiary
                    }
                    .frame(width: 40, height: 40)
                    .clipShape(Circle())
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Attended Developers Night")
                            .font(.custom("Inter", size: 16))
                            .foregroundColor(Color(hex: "191c1d"))
                        Text("1 week ago")
                            .font(.custom("Inter", size: 12))
                            .foregroundColor(Color(hex: "777587"))
                    }
                    Spacer()
                }
                .padding(16)
                .background(Color.white.opacity(0.7).blurEffect())
                .cornerRadius(20)
                .overlay(RoundedRectangle(cornerRadius: 20).stroke(Color.white.opacity(0.3), lineWidth: 1))
            }
        }
    }
}

// MARK: - 5. 계정 설정 섹션
struct AccountSettingsSection: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Account Settings")
                .font(.custom("Poppins-SemiBold", size: 24))
                .fontWeight(.bold)
                .foregroundColor(Color(hex: "191c1d"))
                .padding(.horizontal, 8)
                .padding(.top, 12)
            
            VStack(spacing: 0) {
                SettingRow(icon: "bell", title: "Notifications")
                Divider().background(Color.white.opacity(0.2))
                SettingRow(icon: "shield", title: "Privacy & Security")
                Divider().background(Color.white.opacity(0.2))
                SettingRow(icon: "globe", title: "Language", value: "Korean")
                Divider().background(Color.white.opacity(0.2))
                SettingRow(icon: "questionmark.circle", title: "Help & Support")
            }
            .background(Color.white.opacity(0.7).blurEffect())
            .cornerRadius(24)
            .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.white.opacity(0.3), lineWidth: 1))
        }
    }
}

// 계정 설정 하위 커스텀 로우 뷰
struct SettingRow: View {
    let icon: String
    let title: String
    var value: String? = nil
    
    var body: some View {
        Button(action: {}) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(Color(hex: "777587")) // outline
                    .frame(width: 24)
                
                Text(title)
                    .font(.custom("Inter", size: 16))
                    .foregroundColor(Color(hex: "191c1d"))
                
                Spacer()
                
                if let value = value {
                    Text(value)
                        .font(.custom("Inter", size: 14))
                        .fontWeight(.semibold)
                        .foregroundColor(Color(hex: "3525cd")) // primary
                }
                
                Image(systemName: "chevron.right")
                    .font(.system(size: 14))
                    .foregroundColor(Color(hex: "c7c4d8"))
            }
            .padding(20)
        }
    }
}

// MARK: - 6. 로그아웃 버튼
struct LogOutButton: View {
    var body: some View {
        Button(action: {}) {
            HStack(spacing: 8) {
                Image(systemName: "rectangle.portrait.and.arrow.forward") // logout 매칭
                    .font(.system(size: 18))
                Text("Log Out")
                    .font(.custom("Inter", size: 14))
                    .fontWeight(.semibold)
            }
            .foregroundColor(Color(hex: "ba1a1a")) // error 컬러 트래킹
            .frame(maxWidth: .infinity)
            .padding(.vertical, 20)
        }
    }
}