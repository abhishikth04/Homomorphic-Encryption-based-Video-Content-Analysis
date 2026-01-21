import ExplainLayout from "../components/ExplainLayout";
import ExplainSection from "../components/ExplainSection";

export default function ExplainSystem() {
  return (
    <ExplainLayout title="System Overview">

      <ExplainSection heading="Problem Statement">
        Detecting duplicate or similar videos in cloud environments
        is challenging due to privacy concerns and data exposure risks.
        Traditional systems require access to plaintext data, which
        compromises user privacy.
      </ExplainSection>

      <ExplainSection heading="Proposed Solution">
        Our system introduces a secure video analysis framework that
        combines deep learning–based feature extraction with
        homomorphic encryption. This allows similarity computation
        directly on encrypted data without revealing original content.
      </ExplainSection>

      <ExplainSection heading="System Workflow">
        The uploaded video is processed to extract representative
        frames, from which deep features are generated using a CNN.
        These features are encrypted and compared with existing
        encrypted fingerprints to determine similarity.
      </ExplainSection>

      <ExplainSection heading="Key Advantages">
        • Privacy-preserving computation  
        • Secure cloud-based analysis  
        • Accurate deep learning features  
        • Scalable and modular design
      </ExplainSection>

    </ExplainLayout>
  );
}
