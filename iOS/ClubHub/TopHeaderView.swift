import SwiftUI

struct TopHeaderView: View {
    var body: some View {
        VStack {
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: "graduationcap.fill")
                        .foregroundColor(Color(hex: "3525cd"))
                        .font(.title2)
                    Text("ClubHub")
                        .font(.custom("Poppins-Bold", size: 24))
                        .fontWeight(.bold)
                        .foregroundColor(Color(hex: "3525cd"))
                }
                Spacer()
                Button(action: {}) {
                    Image(systemName: "bell")
                        .foregroundColor(Color(hex: "464555"))
                        .font(.title3)
                }
            }
            .padding(.horizontal, 20)
            .frame(height: 64)
            .background(Color.white.opacity(0.7).blurEffect())
            .border(Color.white.opacity(0.2), width: 1)
            
            Spacer()
        }
    }
}

struct HeroSection: View {
    @Binding var searchText: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Find Your Place\non Campus")
                .font(.custom("Poppins-Bold", size: 36))
                .fontWeight(.bold)
                .foregroundColor(.white)
                .lineLimit(2)
            
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(Color(hex: "777587"))
                TextField("Search clubs, interests, or events...", text: $searchText)
                    .font(.system(size: 16))
            }
            .padding()
            .background(Color.white)
            .cornerRadius(16)
            .shadow(color: Color.black.opacity(0.1), radius: 10, x: 0, y: 5)
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            LinearGradient(
                colors: [Color(hex: "3525cd"), Color(hex: "3130c0")],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .cornerRadius(24)
        .shadow(color: Color(hex: "3525cd").opacity(0.3), radius: 15, x: 0, y: 8)
    }
}
