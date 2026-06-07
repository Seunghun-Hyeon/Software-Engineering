import SwiftUI

struct RecommendedClubsSection: View {
    let clubs = [
        ("cpu", "Robotics Society", "240 Members • Science Wing", "e2dfff", "3525cd"),
        ("heart.text.square", "Handong Helpers", "500+ Members • Social Hub", "6ffbbe", "006c49"),
        ("camera", "Focus Photography", "120 Members • Creative Arts", "e1e0ff", "3130c0")
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Recommended Clubs")
                .font(.custom("Poppins-SemiBold", size: 24))
                .fontWeight(.semibold)
            
            VStack(spacing: 16) {
                ForEach(clubs, id: \.1) { icon, name, desc, bgColor, iconColor in
                    HStack(spacing: 16) {
                        ZStack {
                            Color(hex: bgColor)
                            Image(systemName: icon)
                                .foregroundColor(Color(hex: iconColor))
                                .font(.title)
                        }
                        .frame(width: 64, height: 64)
                        .cornerRadius(16)
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text(name)
                                .font(.system(size: 14, weight: .semibold))
                            Text(desc)
                                .font(.system(size: 12))
                                .foregroundColor(Color(hex: "464555"))
                        }
                        Spacer()
                    }
                    .padding(16)
                    .background(Color.white.opacity(0.7).blurEffect())
                    .cornerRadius(22)
                    .overlay(RoundedRectangle(cornerRadius: 22).stroke(Color.white.opacity(0.3), lineWidth: 1))
                }
            }
        }
    }
}

struct FloatingActionButton: View {
    var body: some View {
        VStack {
            Spacer()
            HStack {
                Spacer()
                Button(action: {}) {
                    Image(systemName: "plus.circle.fill")
                        .resizable()
                        .frame(width: 56, height: 56)
                        .foregroundColor(Color(hex: "3525cd"))
                        .background(Color.white)
                        .clipShape(Circle())
                        .shadow(color: Color.black.opacity(0.3), radius: 10, x: 0, y: 5)
                }
                .padding(.trailing, 24)
                .padding(.bottom, 20) // 💡 탭바 스택 내부로 안착되므로 높이 수정
            }
        }
    }
}
