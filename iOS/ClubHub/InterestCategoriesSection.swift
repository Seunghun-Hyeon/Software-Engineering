import SwiftUI

struct InterestCategoriesSection: View {
    let categories = [
        ("terminal", "Coding", true),
        ("paintpalette", "Arts", false),
        ("figure.basketball", "Sports", false),
        ("music.note", "Music", false)
    ]
    
    var body: some View {
        VStack(spacing: 16) {
            HStack {
                Text("Explore Interests")
                    .font(.custom("Poppins-SemiBold", size: 24))
                    .fontWeight(.semibold)
                Spacer()
                Button("See All") { }
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(Color(hex: "3525cd"))
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(categories, id: \.1) { icon, title, isSelected in
                        HStack(spacing: 8) {
                            Image(systemName: icon)
                            Text(title)
                        }
                        .padding(.horizontal, 24)
                        .padding(.vertical, 12)
                        .background(isSelected ? Color(hex: "4f46e5") : Color.white)
                        .foregroundColor(isSelected ? .white : Color(hex: "464555"))
                        .font(.system(size: 14, weight: .semibold))
                        .cornerRadius(9999)
                        .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
                        .overlay(
                            RoundedRectangle(cornerRadius: 9999)
                                .stroke(Color.white.opacity(0.4), lineWidth: 1)
                        )
                    }
                }
            }
        }
    }
}

struct EventsSection: View {
    var body: some View {
        VStack(spacing: 16) {
            HStack {
                Text("What's Happening")
                    .font(.custom("Poppins-SemiBold", size: 24))
                    .fontWeight(.semibold)
                Spacer()
                HStack(spacing: 4) {
                    Circle().frame(width: 8, height: 8).foregroundColor(Color(hex: "3525cd"))
                    Circle().frame(width: 8, height: 8).foregroundColor(Color(hex: "c7c4d8"))
                    Circle().frame(width: 8, height: 8).foregroundColor(Color(hex: "c7c4d8"))
                }
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 20) {
                    VStack(alignment: .leading, spacing: 0) {
                        ZStack(alignment: .topLeading) {
                            Color.indigo.opacity(0.8)
                                .frame(height: 160)
                            
                            HStack(spacing: 4) {
                                Circle().frame(width: 8, height: 8).foregroundColor(Color(hex: "006c49"))
                                Text("LIVE")
                                    .font(.system(size: 12, weight: .bold))
                                    .foregroundColor(Color(hex: "00714d"))
                            }
                            .padding(.horizontal, 12)
                            .padding(.vertical, 4)
                            .background(Color(hex: "6cf8bb").opacity(0.9))
                            .cornerRadius(9999)
                            .padding(12)
                        }
                        
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Global Tech Meetup")
                                .font(.custom("Poppins-SemiBold", size: 24))
                                .fontWeight(.bold)
                            
                            HStack(spacing: 4) {
                                Image(systemName: "clock")
                                Text("2:00 PM • Grace Hall")
                            }
                            .font(.system(size: 12))
                            .foregroundColor(Color(hex: "464555"))
                            
                            Button(action: {}) {
                                Text("Get Reminded")
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundColor(.white)
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 12)
                                    .background(Color(hex: "3525cd"))
                                    .cornerRadius(9999)
                            }
                        }
                        .padding(20)
                    }
                    .frame(width: UIScreen.main.bounds.width * 0.8)
                    .background(Color.white.opacity(0.7).blurEffect())
                    .cornerRadius(22)
                    .overlay(RoundedRectangle(cornerRadius: 22).stroke(Color.white.opacity(0.3), lineWidth: 1))
                }
            }
        }
    }
}
